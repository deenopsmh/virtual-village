import React, { useState, useEffect } from "react";

const SIZES = [400, 800, 1200, 1600, 1920];

// Helper to check if a URL is absolute (remote)
function isRemoteUrl(src) {
  return /^https?:\/\//i.test(src);
}

// Helper to check if a URL matches IIIF patterns or a Manifest
function isIiifUrl(src) {
  return isRemoteUrl(src) && (src.includes("/iiif/") || src.includes("/full/") || src.includes("/manifest"));
}

// Extracts the IIIF base endpoint from full image URLs or raw manifests
function getIiifBase(src) {
  if (src.includes("/manifest")) {
    // If it's a manifest link like: .../iiif/{id}/manifest
    // We transform it into the IIIF Image API base: .../iiif/{id}
    return src.replace(/\/manifest\/?$/, "");
  }
  // Strips trailing syntax like /full/full/0/default.jpg
  return src.replace(/\/full\/.*$/, "");
}

function getOptimizedBase(src) {
  if (!src) return "";

  let cleanSrc = src
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/^(src\/assets\/|assets\/|VV3 Images - Copy\/)/, "")
    .replace(/\.[^/.]+$/, "");

  const encodedPath = cleanSrc
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/images/optimized/${encodedPath}`;
}

export default function ResponsiveImage({
  src,
  alt = "",
  className = "",
  width,
  height,
  sizes = "100vw",
  loading = "lazy",
  priority = false,
  style = {},
  ...props
}) {
  const [resolvedSrc, setResolvedSrc] = useState(null);
  const [loadingManifest, setLoadingManifest] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function resolveSource() {
      if (!src) return;

      // If it's a Manifest URL, we need to fetch it to check for an image service, 
      // or construct the image endpoint directly from the manifest ID pattern.
      if (isRemoteUrl(src) && src.includes("/manifest")) {
        setLoadingManifest(true);
        try {
          const response = await fetch(src);
          const data = await response.json();
          
          let imageUrl = null;

          // Standard IIIF Presentation API parsing (v2 or v3)
          // Look for images inside canvases -> images/items -> resource/body
          const canvases = data.sequences?.[0]?.canvases || data.items;
          if (canvases && canvases.length > 0) {
            const firstCanvas = canvases[0];
            const imageService = 
              firstCanvas.images?.[0]?.resource?.service?.["@id"] ||
              firstCanvas.items?.[0]?.body?.service?.[0]?.["@id"] ||
              firstCanvas.items?.[0]?.body?.id;

            if (imageService) {
              imageUrl = imageService;
            }
          }

          // Fallback: If JSON parsing doesn't yield a direct image service, 
          // convert the manifest URL pattern directly to its image base endpoint
          if (!imageUrl) {
            imageUrl = getIiifBase(src);
          }

          if (isMounted) {
            setResolvedSrc(imageUrl);
          }
        } catch (error) {
          console.error("Failed to fetch IIIF manifest, falling back to URL conversion:", error);
          if (isMounted) {
            setResolvedSrc(getIiifBase(src));
          }
        } finally {
          if (isMounted) setLoadingManifest(false);
        }
      } else {
        if (isMounted) setResolvedSrc(src);
      }
    }

    resolveSource();

    return () => {
      isMounted = false;
    };
  }, [src]);

    if (!src || !resolvedSrc) {
        return loadingManifest ? <div className={`animate-pulse bg-gray-200 ${className}`} style={{ width, height, ...style }} /> : null;
    }

  const isRemote = isRemoteUrl(resolvedSrc);
  const isIiif = isIiifUrl(resolvedSrc);

  const imageLoading = priority ? "eager" : loading;
  const fetchPriority = priority ? "high" : "auto";
  const decodingMode = priority ? "sync" : "async";

  if (isIiif) {
    const iiifBase = getIiifBase(resolvedSrc);

    const iiifSrcSet = SIZES.map(
      (size) => `${iiifBase}/full/${size},/0/default.jpg ${size}w`
    ).join(", ");

    const defaultSrc = `${iiifBase}/full/800,/0/default.jpg`;

    return (
      <img
        src={defaultSrc}
        srcSet={iiifSrcSet}
        sizes={sizes}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={imageLoading}
        fetchPriority={fetchPriority}
        decoding={decodingMode}
        style={{
          contentVisibility: priority ? "visible" : "auto",
          ...style,
        }}
        {...props}
      />
    );
  }

  if (isRemote) {
    return (
      <img
        src={resolvedSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={imageLoading}
        fetchPriority={fetchPriority}
        decoding={decodingMode}
        style={{
          contentVisibility: priority ? "visible" : "auto",
          ...style,
        }}
        {...props}
      />
    );
  }

  const base = getOptimizedBase(resolvedSrc);
  if (!base) return null;

  const avifSrcSet = SIZES.map((size) => `${base}/${size}.avif ${size}w`).join(", ");
  const webpSrcSet = SIZES.map((size) => `${base}/${size}.webp ${size}w`).join(", ");

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={`${base}/800.webp`}
        srcSet={webpSrcSet}
        sizes={sizes}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={imageLoading}
        fetchPriority={fetchPriority}
        decoding={decodingMode}
        style={{
          contentVisibility: priority ? "visible" : "auto",
          ...style,
        }}
        {...props}
      />
    </picture>
  );
}