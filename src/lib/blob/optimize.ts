import sharp from 'sharp';

/**
 * Optimizes an image using Sharp (server-side)
 * @param file - The image file to optimize
 * @param maxWidth - Maximum width in pixels (default: 1920)
 * @param quality - Quality as integer 1-100 (default: 85)
 */
export async function optimizeImage(
  file: File,
  maxWidth = 1920,
  quality = 85
): Promise<Blob> {
  try {
    // Convert File to Buffer for Sharp
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get image metadata to determine dimensions
    const image = sharp(buffer);
    const metadata = await image.metadata();

    if (!metadata.width) {
      throw new Error('Failed to get image dimensions');
    }

    // Calculate new dimensions if needed
    const shouldResize = metadata.width > maxWidth;
    const resizeOptions = shouldResize ? { width: maxWidth } : undefined;

    // Process image with Sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(resizeOptions)
      .webp({ quality }) // Convert to WebP with specified quality
      .toBuffer();

    // Convert Buffer back to Blob
    // Use Uint8Array to ensure proper type compatibility
    return new Blob([new Uint8Array(optimizedBuffer)], { type: 'image/webp' });
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();

      // Handle specific Sharp errors with user-friendly messages
      if (
        message.includes('unsupported image format') ||
        message.includes('input buffer')
      ) {
        throw new Error(
          'Unsupported image format. Please upload JPEG, PNG, or WebP.'
        );
      }

      if (message.includes('memory') || message.includes('allocation')) {
        throw new Error(
          'Image is too large to process. Please reduce file size.'
        );
      }

      if (message.includes('corrupt') || message.includes('invalid')) {
        throw new Error(
          'Image file appears to be corrupted. Please try a different file.'
        );
      }

      throw new Error(`Failed to optimize image: ${error.message}`);
    }
    throw new Error('Optimization failed');
  }
}
