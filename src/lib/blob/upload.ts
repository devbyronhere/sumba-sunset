import { optimizeImage } from './optimize';
import { blobClient, type BlobUploadResult } from './client';

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const DEFAULT_MAX_SIZE = 10 * 1024 * 1024;

export interface UploadOptions {
  maxWidth?: number;
  quality?: number;
  pathname?: string;
  maxSize?: number;
}

function validateFile(file: File, maxSize: number): void {
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      'Invalid file type. Only JPEG, PNG, and WebP images are supported.'
    );
  }

  if (file.size > maxSize) {
    const maxSizeMB = Math.floor(maxSize / (1024 * 1024));
    throw new Error(`File size exceeds maximum limit of ${maxSizeMB} MB`);
  }
}

export async function uploadImage(
  file: File,
  options?: UploadOptions
): Promise<BlobUploadResult> {
  const {
    maxWidth = 1920,
    quality = 85, // Sharp expects integer 1-100, not decimal 0-1
    pathname,
    maxSize = DEFAULT_MAX_SIZE,
  } = options || {};

  validateFile(file, maxSize);

  try {
    const optimizedBlob = await optimizeImage(file, maxWidth, quality);

    const uploadFile = new File([optimizedBlob], file.name, {
      type: optimizedBlob.type,
    });

    return await blobClient.upload(uploadFile, pathname);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes('Invalid file type') ||
        error.message.includes('File size exceeds')
      ) {
        throw error;
      }
      if (error.message.includes('Failed to upload')) {
        throw error;
      }
      if (
        error.message.includes('Failed to load') ||
        error.message.includes('Failed to create blob') ||
        error.message.includes('Failed to get canvas context') ||
        error.message === 'Optimization failed'
      ) {
        throw new Error(`Failed to optimize image: ${error.message}`);
      }
      throw new Error(`Failed to upload image: ${error.message}`);
    }
    throw new Error('Failed to upload image: Unknown error');
  }
}
