import { put, del, list, type ListBlobResult } from '@vercel/blob';

export interface BlobUploadResult {
  url: string;
  downloadUrl: string;
  pathname: string;
  contentType: string;
  contentDisposition: string;
}

function validateToken(): void {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not configured');
  }
}

export const blobClient = {
  async upload(
    file: File | Blob,
    pathname?: string
  ): Promise<BlobUploadResult> {
    validateToken();

    try {
      const uploadPathname =
        pathname || (file instanceof File ? file.name : 'blob');
      const result = await put(uploadPathname, file, {
        access: 'public',
      });

      return {
        url: result.url,
        downloadUrl: result.downloadUrl,
        pathname: result.pathname,
        contentType: result.contentType || 'application/octet-stream',
        contentDisposition: result.contentDisposition,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to upload file: ${message}`);
    }
  },

  async delete(url: string): Promise<void> {
    validateToken();

    try {
      await del(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to delete file: ${message}`);
    }
  },

  async list(options?: Parameters<typeof list>[0]): Promise<ListBlobResult> {
    validateToken();

    try {
      return await list(options);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to list files: ${message}`);
    }
  },
};
