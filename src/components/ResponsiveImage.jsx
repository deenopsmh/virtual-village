import React from "react";

const SIZES = [400, 800, 1200, 1600, 1920];

function getOptimizedBase(src) {
  if (!src) return "";

  let cleanSrc = src
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    // Strip src/assets/, assets/, AND VV3 Images - Copy/ prefixes
    .replace(/^(src\/assets\/|assets\/|VV3 Images - Copy\/)/, "")
    .replace(/\.[^/.]+$/, "");

  // Encode spaces and special characters while preserving forward slashes
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
  const base = getOptimizedBase(src);

  if (!base) return null;

  const avifSrcSet = SIZES.map((size) => `${base}/${size}.avif ${size}w`).join(", ");
  const webpSrcSet = SIZES.map((size) => `${base}/${size}.webp ${size}w`).join(", ");

  const imageLoading = priority ? "eager" : loading;
  const fetchPriority = priority ? "high" : "auto";

  return (
    <picture>
      <source 
        type="image/avif" 
        srcSet={avifSrcSet} 
        sizes={sizes} 
      />

      <source 
        type="image/webp" 
        srcSet={webpSrcSet} 
        sizes={sizes} 
      />

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
        decoding={priority ? "sync" : "async"}
        style={{
          contentVisibility: priority ? "visible" : "auto",
          ...style,
        }}
        {...props}
      />
    </picture>
  );
}