"use client"

import { useState } from "react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImageSrc(fallbackSrc)
      setHasError(true)
    } else if (!hasError) {
      // Generate SVG fallback
      const svgData = btoa(`
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#ffffff"/>
          <rect x="50" y="50" width="${width - 100}" height="${height - 100}" fill="none" stroke="#1D2E44" stroke-width="2"/>
          <line x1="150" y1="50" x2="150" y2="${height - 50}" stroke="#1D2E44" stroke-width="2"/>
          <line x1="250" y1="50" x2="250" y2="${height - 50}" stroke="#1D2E44" stroke-width="2"/>
          <line x1="350" y1="50" x2="350" y2="${height - 50}" stroke="#1D2E44" stroke-width="2"/>
        </svg>
      `)
      setImageSrc(`data:image/svg+xml;base64,${svgData}`)
      setHasError(true)
    }
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  )
}