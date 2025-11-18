import { describe, it, expect, vi, beforeEach } from 'vitest';
import { uploadImage, UploadOptions } from './upload';

vi.mock('./optimize', () => ({
  optimizeImage: vi.fn(),
}));

vi.mock('./client', () => ({
  blobClient: {
    upload: vi.fn(),
  },
}));

describe('uploadImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('file validation', () => {
    it('should accept valid image types (JPEG)', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockBlob = new Blob(['optimized'], { type: 'image/jpeg' });

      const { optimizeImage } = await import('./optimize');
      const { blobClient } = await import('./client');

      vi.mocked(optimizeImage).mockResolvedValueOnce(mockBlob);
      vi.mocked(blobClient.upload).mockResolvedValueOnce({
        url: 'https://blob.vercel-storage.com/test.jpg',
        downloadUrl: 'https://blob.vercel-storage.com/test.jpg',
        pathname: 'test.jpg',
        contentType: 'image/jpeg',
        contentDisposition: 'inline',
      });

      const result = await uploadImage(mockFile);

      expect(result.url).toBe('https://blob.vercel-storage.com/test.jpg');
    });

    it('should accept valid image types (PNG)', async () => {
      const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
      const mockBlob = new Blob(['optimized'], { type: 'image/png' });

      const { optimizeImage } = await import('./optimize');
      const { blobClient } = await import('./client');

      vi.mocked(optimizeImage).mockResolvedValueOnce(mockBlob);
      vi.mocked(blobClient.upload).mockResolvedValueOnce({
        url: 'https://blob.vercel-storage.com/test.png',
        downloadUrl: 'https://blob.vercel-storage.com/test.png',
        pathname: 'test.png',
        contentType: 'image/png',
        contentDisposition: 'inline',
      });

      const result = await uploadImage(mockFile);

      expect(result.url).toBe('https://blob.vercel-storage.com/test.png');
    });

    it('should accept valid image types (WebP)', async () => {
      const mockFile = new File(['test'], 'test.webp', { type: 'image/webp' });
      const mockBlob = new Blob(['optimized'], { type: 'image/webp' });

      const { optimizeImage } = await import('./optimize');
      const { blobClient } = await import('./client');

      vi.mocked(optimizeImage).mockResolvedValueOnce(mockBlob);
      vi.mocked(blobClient.upload).mockResolvedValueOnce({
        url: 'https://blob.vercel-storage.com/test.webp',
        downloadUrl: 'https://blob.vercel-storage.com/test.webp',
        pathname: 'test.webp',
        contentType: 'image/webp',
        contentDisposition: 'inline',
      });

      const result = await uploadImage(mockFile);

      expect(result.url).toBe('https://blob.vercel-storage.com/test.webp');
    });

    it('should reject invalid file types', async () => {
      const mockFile = new File(['test'], 'test.pdf', {
        type: 'application/pdf',
      });

      await expect(uploadImage(mockFile)).rejects.toThrow(
        'Invalid file type. Only JPEG, PNG, and WebP images are supported.'
      );
    });

    it('should reject files exceeding size limit', async () => {
      const largeData = new Uint8Array(11 * 1024 * 1024);
      const mockFile = new File([largeData], 'large.jpg', {
        type: 'image/jpeg',
      });

      await expect(uploadImage(mockFile)).rejects.toThrow(
        'File size exceeds maximum limit of 10 MB'
      );
    });

    it('should accept custom size limit', async () => {
      const data = new Uint8Array(6 * 1024 * 1024);
      const mockFile = new File([data], 'image.jpg', { type: 'image/jpeg' });

      const options: UploadOptions = { maxSize: 5 * 1024 * 1024 };

      await expect(uploadImage(mockFile, options)).rejects.toThrow(
        'File size exceeds maximum limit of 5 MB'
      );
    });
  });

  describe('optimization', () => {
    it('should optimize image before upload', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockBlob = new Blob(['optimized'], { type: 'image/jpeg' });

      const { optimizeImage } = await import('./optimize');
      const { blobClient } = await import('./client');

      vi.mocked(optimizeImage).mockResolvedValueOnce(mockBlob);
      vi.mocked(blobClient.upload).mockResolvedValueOnce({
        url: 'https://blob.vercel-storage.com/test.jpg',
        downloadUrl: 'https://blob.vercel-storage.com/test.jpg',
        pathname: 'test.jpg',
        contentType: 'image/jpeg',
        contentDisposition: 'inline',
      });

      await uploadImage(mockFile);

      expect(optimizeImage).toHaveBeenCalledWith(mockFile, 1920, 85);
    });

    it('should use custom optimization settings', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockBlob = new Blob(['optimized'], { type: 'image/jpeg' });

      const { optimizeImage } = await import('./optimize');
      const { blobClient } = await import('./client');

      vi.mocked(optimizeImage).mockResolvedValueOnce(mockBlob);
      vi.mocked(blobClient.upload).mockResolvedValueOnce({
        url: 'https://blob.vercel-storage.com/test.jpg',
        downloadUrl: 'https://blob.vercel-storage.com/test.jpg',
        pathname: 'test.jpg',
        contentType: 'image/jpeg',
        contentDisposition: 'inline',
      });

      const options: UploadOptions = { maxWidth: 1024, quality: 70 };
      await uploadImage(mockFile, options);

      expect(optimizeImage).toHaveBeenCalledWith(mockFile, 1024, 70);
    });

    it('should handle optimization errors', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      const { optimizeImage } = await import('./optimize');
      vi.mocked(optimizeImage).mockRejectedValueOnce(
        new Error('Optimization failed')
      );

      await expect(uploadImage(mockFile)).rejects.toThrow(
        'Failed to optimize image: Optimization failed'
      );
    });
  });

  describe('upload', () => {
    it('should upload optimized image with custom pathname', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockBlob = new Blob(['optimized'], { type: 'image/jpeg' });

      const { optimizeImage } = await import('./optimize');
      const { blobClient } = await import('./client');

      vi.mocked(optimizeImage).mockResolvedValueOnce(mockBlob);
      vi.mocked(blobClient.upload).mockResolvedValueOnce({
        url: 'https://blob.vercel-storage.com/custom/path/test.jpg',
        downloadUrl: 'https://blob.vercel-storage.com/custom/path/test.jpg',
        pathname: 'custom/path/test.jpg',
        contentType: 'image/jpeg',
        contentDisposition: 'inline',
      });

      const options: UploadOptions = { pathname: 'custom/path/test.jpg' };
      const result = await uploadImage(mockFile, options);

      expect(blobClient.upload).toHaveBeenCalledWith(
        expect.any(File),
        'custom/path/test.jpg'
      );
      expect(result.url).toBe(
        'https://blob.vercel-storage.com/custom/path/test.jpg'
      );
    });

    it('should handle upload errors', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockBlob = new Blob(['optimized'], { type: 'image/jpeg' });

      const { optimizeImage } = await import('./optimize');
      const { blobClient } = await import('./client');

      vi.mocked(optimizeImage).mockResolvedValueOnce(mockBlob);
      vi.mocked(blobClient.upload).mockRejectedValueOnce(
        new Error('Upload failed')
      );

      await expect(uploadImage(mockFile)).rejects.toThrow(
        'Failed to upload image: Upload failed'
      );
    });

    it('should return upload result with metadata', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockBlob = new Blob(['optimized'], { type: 'image/jpeg' });

      const { optimizeImage } = await import('./optimize');
      const { blobClient } = await import('./client');

      vi.mocked(optimizeImage).mockResolvedValueOnce(mockBlob);
      vi.mocked(blobClient.upload).mockResolvedValueOnce({
        url: 'https://blob.vercel-storage.com/test.jpg',
        downloadUrl: 'https://blob.vercel-storage.com/test.jpg',
        pathname: 'test.jpg',
        contentType: 'image/jpeg',
        contentDisposition: 'inline',
      });

      const result = await uploadImage(mockFile);

      expect(result).toEqual({
        url: 'https://blob.vercel-storage.com/test.jpg',
        downloadUrl: 'https://blob.vercel-storage.com/test.jpg',
        pathname: 'test.jpg',
        contentType: 'image/jpeg',
        contentDisposition: 'inline',
      });
    });
  });
});
