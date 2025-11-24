'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageUploader } from '@/components/media/ImageUploader';
import { ImageGallery, type ImageItem } from '@/components/media/ImageGallery';

export default function ImageDemoPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();

      setImages((prev) => [
        ...prev,
        {
          url: result.url,
          alt: file.name,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      const response = await fetch('/api/images/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: imageUrl }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Delete failed');
      }

      setImages((prev) => prev.filter((img) => img.url !== imageUrl));
      if (selectedImage?.url === imageUrl) {
        setSelectedImage(null);
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Image Upload & Gallery Demo</h1>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Upload Image</h2>
        <ImageUploader onUpload={handleUpload} disabled={isLoading} />
      </div>

      {images.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">
            Gallery ({images.length} {images.length === 1 ? 'image' : 'images'})
          </h2>
          <ImageGallery images={images} onImageClick={handleImageClick} />
        </div>
      )}

      {selectedImage && (
        <div
          className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="w-full max-w-4xl rounded-lg bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selectedImage.alt}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="relative mb-4 aspect-video">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleDeleteImage(selectedImage.url);
                }}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Delete
              </button>
              <a
                href={selectedImage.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Open in New Tab
              </a>
            </div>
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No images uploaded yet. Upload your first image above!
        </div>
      )}
    </div>
  );
}
