import sharp from "sharp";
import fg from "fast-glob";
import path from "path";
import fs from "fs-extra";
import crypto from "crypto";
import pLimit from "p-limit";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");

const SOURCE = path.join(
  ROOT,
  "src",
  "assets",
  "VV3 Images - Copy"
);

const CODE_DIR = path.join(ROOT, "src");

const OUTPUT = path.join(
  ROOT,
  "public",
  "images",
  "optimized"
);

const SIZES = [400, 800, 1200, 1600, 1920];
const FORMATS = ["avif", "webp"];
const CONCURRENCY = 6;
const limit = pLimit(CONCURRENCY);

const IMAGE_PATTERN = "**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}";
const CODE_PATTERN = "**/*.{js,jsx,ts,tsx,html,css,json,md,mdx}";

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function hashFile(file) {
  const buffer = await fs.readFile(file);
  return crypto.createHash("md5").update(buffer).digest("hex");
}

async function alreadyProcessed(output, hash) {
  const hashFile = `${output}.hash`;
  if (!(await fs.pathExists(hashFile))) {
    return false;
  }
  const oldHash = await fs.readFile(hashFile, "utf8");
  return oldHash === hash;
}

async function getUsedFiles(allFiles) {
  console.log("Auditing codebase for referenced image files...\n");

  const codeFilePaths = await fg(CODE_PATTERN, {
    cwd: CODE_DIR,
    absolute: true,
    onlyFiles: true,
    ignore: ["**/assets/VV3 Images - Copy/**"]
  });

  const codeFiles = await Promise.all(
    codeFilePaths.map(async filePath => {
      const content = await fs.readFile(filePath, "utf8").catch(() => "");
      return {
        path: filePath,
        relativePath: path.relative(ROOT, filePath),
        lines: content.split("\n")
      };
    })
  );

  const matchedFiles = [];

  for (const file of allFiles) {
    const relativeAssetPath = path.relative(SOURCE, file);
    const parsed = path.parse(relativeAssetPath);
    
    const fileNameExact = parsed.base; // e.g. "G to D Chaurasiya vastraliya.jpg"
    const fileNameWithoutExt = parsed.name; // e.g. "G to D Chaurasiya vastraliya"

    let matchFound = null;

    for (const codeFile of codeFiles) {
      for (let i = 0; i < codeFile.lines.length; i++) {
        const line = codeFile.lines[i];

        // Check if full filename OR filename without extension exists in code line
        const isFileMatched = 
          (fileNameExact && line.includes(fileNameExact)) ||
          (fileNameWithoutExt && fileNameWithoutExt.length > 2 && line.includes(fileNameWithoutExt));

        if (isFileMatched) {
          matchFound = {
            codeFile: codeFile.relativePath,
            lineNumber: i + 1,
            matchedBy: `filename ("${fileNameWithoutExt}")`
          };
          break;
        }
      }
      if (matchFound) break;
    }

    if (matchFound) {
      matchedFiles.push({
        file,
        relativeAssetPath,
        matchFound
      });
    }
  }

  return matchedFiles;
}

async function cleanStaleOutputs(activeFiles) {
  if (!(await fs.pathExists(OUTPUT))) return;

  console.log("Checking for obsolete output files...");

  const activeOutputDirPaths = new Set(
    activeFiles.map(item => {
      const relative = path.relative(SOURCE, item.file);
      const parsed = path.parse(relative);
      return path.join(parsed.dir, parsed.name);
    })
  );

  const existingDirs = await fg("**/*", {
    cwd: OUTPUT,
    onlyDirectories: true
  });

  let removedCount = 0;

  for (const dir of existingDirs) {
    if (!activeOutputDirPaths.has(dir)) {
      const isParentOfActive = Array.from(activeOutputDirPaths).some(activePath =>
        activePath.startsWith(dir + path.sep)
      );

      if (!isParentOfActive) {
        const fullPath = path.join(OUTPUT, dir);
        if (await fs.pathExists(fullPath)) {
          await fs.remove(fullPath);
          console.log(`  Removed stale folder: ${dir}`);
          removedCount++;
        }
      }
    }
  }

  if (removedCount === 0) {
    console.log("  No stale output folders found.\n");
  } else {
    console.log(`  Cleaned up ${removedCount} outdated folder(s).\n`);
  }
}

async function processImage(file, index, total) {
  const relative = path.relative(SOURCE, file);

  console.log(`[${index}/${total}] Processing ${relative}`);

  const parsed = path.parse(relative);

  const outputFolder = path.join(
    OUTPUT,
    parsed.dir,
    parsed.name
  );

  await fs.ensureDir(outputFolder);

  const hash = await hashFile(file);
  const image = sharp(file).rotate();
  const metadata = await image.metadata();

  for (const size of SIZES) {
    if (metadata.width && size > metadata.width) {
      continue;
    }

    for (const format of FORMATS) {
      const output = path.join(
        outputFolder,
        `${size}.${format}`
      );

      if (await alreadyProcessed(output, hash)) {
        continue;
      }

      let pipeline = image.clone().resize({
        width: size,
        withoutEnlargement: true
      });

      if (format === "avif") {
        pipeline = pipeline.avif({ quality: 55, effort: 5 });
      }

      if (format === "webp") {
        pipeline = pipeline.webp({ quality: 75 });
      }

      await pipeline.toFile(output);
      await fs.writeFile(`${output}.hash`, hash);
    }
  }
}

async function main() {
  console.log("\nScanning source assets...\n");

  const allFiles = await fg(IMAGE_PATTERN, {
    cwd: SOURCE,
    absolute: true,
    onlyFiles: true
  });

  if (allFiles.length === 0) {
    console.log("No images found in source directory.");
    return;
  }

  console.log(`Found ${allFiles.length} total raw images.`);

  const auditedAssets = await getUsedFiles(allFiles);

  if (auditedAssets.length === 0) {
    console.log("No used image folders or files detected in your src/ codebase.");
    return;
  }

  console.log(`Filtered down to ${auditedAssets.length} active image(s):\n`);

  auditedAssets.forEach((item, index) => {
    const { relativeAssetPath, matchFound } = item;
    console.log(`${index + 1}. ${relativeAssetPath}`);
    console.log(`   Referenced in: ${matchFound.codeFile}:${matchFound.lineNumber}`);
    console.log(`   Matched by: ${matchFound.matchedBy}\n`);
  });

  const answer = await ask(
    `Start optimization for ${auditedAssets.length} audited images? (y/n): `
  );

  if (answer !== "y") {
    console.log("Cancelled.");
    return;
  }

  console.log("");

  await cleanStaleOutputs(auditedAssets);

  console.log("Starting optimization...\n");

  let completed = 0;

  await Promise.all(
    auditedAssets.map(item =>
      limit(async () => {
        completed++;
        await processImage(item.file, completed, auditedAssets.length);
      })
    )
  );

  console.log("\nOptimization complete!");
  console.log(`Output: ${OUTPUT}`);
}

main();