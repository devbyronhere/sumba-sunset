'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageItem {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ImageGalleryProps {
  images: ImageItem[];
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  onImageClick?: (image: ImageItem) => void;
}

export function ImageGallery({
  images,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  onImageClick,
}: ImageGalleryProps) {
  const mobileColumns = columns.mobile || 1;
  const tabletColumns = columns.tablet || 2;
  const desktopColumns = columns.desktop || 3;

  return (
    <div
      className={cn(
        'grid gap-4',
        mobileColumns === 1 && 'grid-cols-1',
        mobileColumns === 2 && 'grid-cols-2',
        mobileColumns === 3 && 'grid-cols-3',
        mobileColumns === 4 && 'grid-cols-4',
        tabletColumns === 1 && 'md:grid-cols-1',
        tabletColumns === 2 && 'md:grid-cols-2',
        tabletColumns === 3 && 'md:grid-cols-3',
        tabletColumns === 4 && 'md:grid-cols-4',
        desktopColumns === 1 && 'lg:grid-cols-1',
        desktopColumns === 2 && 'lg:grid-cols-2',
        desktopColumns === 3 && 'lg:grid-cols-3',
        desktopColumns === 4 && 'lg:grid-cols-4'
      )}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-square cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-90"
          onClick={() => onImageClick?.(image)}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
