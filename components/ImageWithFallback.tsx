'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  className = '',
  ...props
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImageSrc(fallbackSrc)
      setHasError(true)
    } else if (!hasError && width && height) {
      // Generate SVG fallback - ensuring width and height are defined
      const numWidth = typeof width === 'string' ? parseInt(width, 10) : width;
      const numHeight = typeof height === 'string' ? parseInt(height, 10) : height;
      
      // Ensure width and height are numbers before arithmetic operations
      const adjustedWidth = numWidth > 100 ? numWidth - 100 : numWidth;
      const adjustedHeight = numHeight > 100 ? numHeight - 100 : numHeight;
      const lineY2_1 = numHeight > 50 ? numHeight - 50 : numHeight;
      const lineY2_2 = numHeight > 50 ? numHeight - 50 : numHeight;
      const lineY2_3 = numHeight > 50 ? numHeight - 50 : numHeight;
      
      const svgData = btoa(`
        <svg width="${numWidth}" height="${numHeight}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#ffffff"/>
          <rect x="50" y="50" width="${adjustedWidth}" height="${adjustedHeight}" fill="none" stroke="#1D2E44" stroke-width="2"/>
          <line x1="150" y1="50" x2="150" y2="${lineY2_1}" stroke="#1D2E44" stroke-width="2"/>
          <line x1="250" y1="50" x2="250" y2="${lineY2_2}" stroke="#1D2E44" stroke-width="2"/>
          <line x1="350" y1="50" x2="350" y2="${lineY2_3}" stroke="#1D2E44" stroke-width="2"/>
        </svg>
      `)
      setImageSrc(`data:image/svg+xml;base64,${svgData}`)
      setHasError(true)
    }
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      {...props}
    />
  )
}