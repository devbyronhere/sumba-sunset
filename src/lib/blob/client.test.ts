import { describe, it, expect, vi, beforeEach } from 'vitest';
import { blobClient } from './client';

vi.mock('@vercel/blob', () => ({
  put: vi.fn(),
  del: vi.fn(),
  list: vi.fn(),
}));

describe('blobClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('upload', () => {
    it('should upload a file successfully', async () => {
      process.env.BLOB_READ_WRITE_TOKEN = 'test-token';

      const mockFile = new File(['test content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const mockUrl = 'https://blob.vercel-storage.com/test-abc123.jpg';

      const { put } = await import('@vercel/blob');
      vi.mocked(put).mockResolvedValueOnce({
        url: mockUrl,
        downloadUrl: mockUrl,
        pathname: 'test-abc123.jpg',
        contentType: 'image/jpeg',
        contentDisposition: 'inline',
      });

      const result = await blobClient.upload(mockFile);

      expect(result.url).toBe(mockUrl);
      expect(put).toHaveBeenCalledWith('test.jpg', mockFile, {
        access: 'public',
      });
    });

    it('should upload with custom pathname', async () => {
      process.env.BLOB_READ_WRITE_TOKEN = 'test-token';

      const mockFile = new File(['test content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const customPathname = 'custom/path/image.jpg';

      const { put } = await import('@vercel/blob');
      vi.mocked(put).mockResolvedValueOnce({
        url: 'https://blob.vercel-storage.com/custom/path/image-abc123.jpg',
        downloadUrl:
          'https://blob.vercel-storage.com/custom/path/image-abc123.jpg',
        pathname: customPathname,
        contentType: 'image/jpeg',
        contentDisposition: 'inline',
      });

      await blobClient.upload(mockFile, customPathname);

      expect(put).toHaveBeenCalledWith(customPathname, mockFile, {
        access: 'public',
      });
    });

    it('should throw error when BLOB_READ_WRITE_TOKEN is missing', async () => {
      const originalEnv = process.env.BLOB_READ_WRITE_TOKEN;
      delete process.env.BLOB_READ_WRITE_TOKEN;

      const mockFile = new File(['test content'], 'test.jpg', {
        type: 'image/jpeg',
      });

      await expect(blobClient.upload(mockFile)).rejects.toThrow(
        'BLOB_READ_WRITE_TOKEN is not configured'
      );

      process.env.BLOB_READ_WRITE_TOKEN = originalEnv;
    });

    it('should handle upload errors', async () => {
      process.env.BLOB_READ_WRITE_TOKEN = 'test-token';

      const mockFile = new File(['test content'], 'test.jpg', {
        type: 'image/jpeg',
      });

      const { put } = await import('@vercel/blob');
      vi.mocked(put).mockRejectedValueOnce(new Error('Upload failed'));

      await expect(blobClient.upload(mockFile)).rejects.toThrow(
        'Failed to upload file: Upload failed'
      );
    });
  });

  describe('delete', () => {
    it('should delete a file successfully', async () => {
      process.env.BLOB_READ_WRITE_TOKEN = 'test-token';

      const testUrl = 'https://blob.vercel-storage.com/test-abc123.jpg';

      const { del } = await import('@vercel/blob');
      vi.mocked(del).mockResolvedValueOnce(undefined);

      await blobClient.delete(testUrl);

      expect(del).toHaveBeenCalledWith(testUrl);
    });

    it('should throw error when BLOB_READ_WRITE_TOKEN is missing', async () => {
      const originalEnv = process.env.BLOB_READ_WRITE_TOKEN;
      delete process.env.BLOB_READ_WRITE_TOKEN;

      const testUrl = 'https://blob.vercel-storage.com/test-abc123.jpg';

      await expect(blobClient.delete(testUrl)).rejects.toThrow(
        'BLOB_READ_WRITE_TOKEN is not configured'
      );

      process.env.BLOB_READ_WRITE_TOKEN = originalEnv;
    });

    it('should handle delete errors', async () => {
      process.env.BLOB_READ_WRITE_TOKEN = 'test-token';

      const testUrl = 'https://blob.vercel-storage.com/test-abc123.jpg';

      const { del } = await import('@vercel/blob');
      vi.mocked(del).mockRejectedValueOnce(new Error('Delete failed'));

      await expect(blobClient.delete(testUrl)).rejects.toThrow(
        'Failed to delete file: Delete failed'
      );
    });
  });

  describe('list', () => {
    it('should list files successfully', async () => {
      process.env.BLOB_READ_WRITE_TOKEN = 'test-token';

      const mockBlobs = [
        {
          url: 'https://blob.vercel-storage.com/test1-abc123.jpg',
          pathname: 'test1-abc123.jpg',
          size: 1024,
          uploadedAt: new Date('2025-01-20'),
          downloadUrl: 'https://blob.vercel-storage.com/test1-abc123.jpg',
        },
        {
          url: 'https://blob.vercel-storage.com/test2-def456.jpg',
          pathname: 'test2-def456.jpg',
          size: 2048,
          uploadedAt: new Date('2025-01-21'),
          downloadUrl: 'https://blob.vercel-storage.com/test2-def456.jpg',
        },
      ];

      const { list } = await import('@vercel/blob');
      vi.mocked(list).mockResolvedValueOnce({
        blobs: mockBlobs,
        hasMore: false,
        cursor: undefined,
      });

      const result = await blobClient.list();

      expect(result.blobs).toHaveLength(2);
      expect(result.blobs[0].url).toBe(mockBlobs[0].url);
      expect(list).toHaveBeenCalledWith(undefined);
    });

    it('should list files with prefix filter', async () => {
      process.env.BLOB_READ_WRITE_TOKEN = 'test-token';

      const mockBlobs = [
        {
          url: 'https://blob.vercel-storage.com/images/test1-abc123.jpg',
          pathname: 'images/test1-abc123.jpg',
          size: 1024,
          uploadedAt: new Date('2025-01-20'),
          downloadUrl:
            'https://blob.vercel-storage.com/images/test1-abc123.jpg',
        },
      ];

      const { list } = await import('@vercel/blob');
      vi.mocked(list).mockResolvedValueOnce({
        blobs: mockBlobs,
        hasMore: false,
        cursor: undefined,
      });

      const result = await blobClient.list({ prefix: 'images/' });

      expect(result.blobs).toHaveLength(1);
      expect(list).toHaveBeenCalledWith({ prefix: 'images/' });
    });

    it('should throw error when BLOB_READ_WRITE_TOKEN is missing', async () => {
      const originalEnv = process.env.BLOB_READ_WRITE_TOKEN;
      delete process.env.BLOB_READ_WRITE_TOKEN;

      await expect(blobClient.list()).rejects.toThrow(
        'BLOB_READ_WRITE_TOKEN is not configured'
      );

      process.env.BLOB_READ_WRITE_TOKEN = originalEnv;
    });

    it('should handle list errors', async () => {
      process.env.BLOB_READ_WRITE_TOKEN = 'test-token';

      const { list } = await import('@vercel/blob');
      vi.mocked(list).mockRejectedValueOnce(new Error('List failed'));

      await expect(blobClient.list()).rejects.toThrow(
        'Failed to list files: List failed'
      );
    });
  });
});
