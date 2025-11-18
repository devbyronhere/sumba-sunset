'use client';

import { useState, useCallback, type ChangeEvent, type DragEvent } from 'react';

export interface ImageUploaderProps {
  onUpload: (file: File) => Promise<void>;
  maxSize?: number;
  accept?: string;
  disabled?: boolean;
}

export function ImageUploader({
  onUpload,
  maxSize = 10 * 1024 * 1024,
  accept = 'image/jpeg,image/png,image/webp',
  disabled = false,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndUploadFile = useCallback(
    async (file: File) => {
      setError(null);

      if (file.size > maxSize) {
        const maxSizeMB = Math.floor(maxSize / (1024 * 1024));
        setError(`File size exceeds ${maxSizeMB}MB limit`);
        return;
      }

      const acceptedTypes = accept.split(',').map((t) => t.trim());
      if (!acceptedTypes.includes(file.type)) {
        setError('Invalid file type. Only JPEG, PNG, and WebP are supported.');
        return;
      }

      setIsUploading(true);

      try {
        await onUpload(file);
        setIsUploading(false);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Upload failed';
        setError(message);
        setIsUploading(false);
      }
    },
    [onUpload, maxSize, accept]
  );

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        await validateAndUploadFile(file);
      }
    },
    [validateAndUploadFile]
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const file = event.dataTransfer.files[0];
      if (file) {
        await validateAndUploadFile(file);
      }
    },
    [validateAndUploadFile]
  );

  return (
    <div className="w-full">
      <div
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} ${disabled || isUploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-gray-400'} `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled || isUploading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className={`block ${disabled || isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isUploading ? (
            <p className="text-gray-600">Image is uploading...</p>
          ) : (
            <>
              <p className="mb-2 text-gray-600">
                Drag and drop an image, or click to select
              </p>
              <p className="text-sm text-gray-500">
                JPEG, PNG, or WebP (max {Math.floor(maxSize / (1024 * 1024))}
                MB)
              </p>
            </>
          )}
        </label>
      </div>

      {error && (
        <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
