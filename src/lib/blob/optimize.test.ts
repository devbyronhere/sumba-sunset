import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { optimizeImage } from './optimize';

// Define proper type for mocked Sharp instance
interface MockSharpInstance {
  metadata: Mock;
  resize: Mock;
  webp: Mock;
  toBuffer: Mock;
}

// Mock Sharp
vi.mock('sharp', () => {
  const mockSharpInstance: MockSharpInstance = {
    metadata: vi.fn(),
    resize: vi.fn(),
    webp: vi.fn(),
    toBuffer: vi.fn(),
  };

  // Chain methods - each method returns the instance for chaining
  mockSharpInstance.resize.mockReturnValue(mockSharpInstance);
  mockSharpInstance.webp.mockReturnValue(mockSharpInstance);

  const mockSharp = vi.fn(() => mockSharpInstance);
  return { default: mockSharp };
});

import sharp from 'sharp';

/**
 * Helper function to get the mocked Sharp instance
 * This provides type-safe access to the mock
 */
function getMockSharpInstance(): MockSharpInstance {
  return sharp() as unknown as MockSharpInstance;
}

describe('optimizeImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock File.arrayBuffer() method since it doesn't exist in jsdom
    File.prototype.arrayBuffer = vi.fn().mockResolvedValue(new ArrayBuffer(8));

    // Default mock implementations
    const mockInstance = getMockSharpInstance();
    mockInstance.metadata.mockResolvedValue({
      width: 2000,
      height: 1500,
      format: 'jpeg',
    });
    mockInstance.toBuffer.mockResolvedValue(
      Buffer.from('optimized-image-data')
    );
  });

  /**
   * Test: Basic optimization with defaults
   * Verifies: Function returns a WebP Blob and calls Sharp
   */
  it('should optimize an image with default settings', async () => {
    const mockFile = new File(['test-image-data'], 'test.jpg', {
      type: 'image/jpeg',
    });

    const result = await optimizeImage(mockFile);

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe('image/webp');
    expect(sharp).toHaveBeenCalled();
  });

  /**
   * Test: Resize logic when image exceeds max width
   * Verifies: Sharp.resize() is called with correct width when image is too large
   */
  it('should resize image to max width when width exceeds limit', async () => {
    const mockInstance = getMockSharpInstance();
    mockInstance.metadata.mockResolvedValue({
      width: 2000,
      height: 1500,
      format: 'jpeg',
    });

    const mockFile = new File(['test'], 'test.jpg', {
      type: 'image/jpeg',
    });

    await optimizeImage(mockFile, 1024);

    expect(mockInstance.resize).toHaveBeenCalledWith({ width: 1024 });
  });

  /**
   * Test: No resize when image is smaller than max width
   * Verifies: Sharp.resize() is called with undefined (no resize) for small images
   */
  it('should not resize when image width is below max width', async () => {
    const mockInstance = getMockSharpInstance();
    mockInstance.metadata.mockResolvedValue({
      width: 800,
      height: 600,
      format: 'jpeg',
    });

    const mockFile = new File(['test'], 'test.jpg', {
      type: 'image/jpeg',
    });

    await optimizeImage(mockFile, 1024);

    expect(mockInstance.resize).toHaveBeenCalledWith(undefined);
  });

  /**
   * Test: Custom quality parameter
   * Verifies: Sharp.webp() receives custom quality value
   */
  it('should apply custom quality setting', async () => {
    const mockInstance = getMockSharpInstance();

    const mockFile = new File(['test'], 'test.jpg', {
      type: 'image/jpeg',
    });

    await optimizeImage(mockFile, 1920, 75);

    expect(mockInstance.webp).toHaveBeenCalledWith({ quality: 75 });
  });

  /**
   * Test: Default quality parameter
   * Verifies: Sharp.webp() uses 85 as default quality
   */
  it('should use default quality of 85', async () => {
    const mockInstance = getMockSharpInstance();

    const mockFile = new File(['test'], 'test.jpg', {
      type: 'image/jpeg',
    });

    await optimizeImage(mockFile);

    expect(mockInstance.webp).toHaveBeenCalledWith({ quality: 85 });
  });

  /**
   * Test: WebP conversion for all formats
   * Verifies: All images (JPEG, PNG, etc.) are converted to WebP
   */
  it('should convert all images to WebP format', async () => {
    const mockInstance = getMockSharpInstance();

    const mockFile = new File(['test'], 'test.png', {
      type: 'image/png',
    });

    const result = await optimizeImage(mockFile);

    expect(result.type).toBe('image/webp');
    expect(mockInstance.webp).toHaveBeenCalled();
  });

  /**
   * Test: PNG image handling
   * Verifies: PNG files are processed successfully
   */
  it('should handle PNG images', async () => {
    const mockInstance = getMockSharpInstance();
    mockInstance.metadata.mockResolvedValue({
      width: 1200,
      height: 800,
      format: 'png',
    });

    const mockFile = new File(['test'], 'test.png', {
      type: 'image/png',
    });

    const result = await optimizeImage(mockFile);

    expect(result).toBeInstanceOf(Blob);
    expect(sharp).toHaveBeenCalled();
  });

  /**
   * Test: Error handling for corrupted images
   * Verifies: User-friendly error message when Sharp metadata extraction fails
   */
  it('should throw error when metadata fails', async () => {
    const mockInstance = getMockSharpInstance();
    mockInstance.metadata.mockRejectedValue(new Error('Invalid image data'));

    const mockFile = new File(['invalid'], 'test.jpg', {
      type: 'image/jpeg',
    });

    await expect(optimizeImage(mockFile)).rejects.toThrow(
      'Image file appears to be corrupted. Please try a different file.'
    );
  });

  /**
   * Test: Error handling for missing image dimensions
   * Verifies: Proper error when metadata lacks width property
   */
  it('should throw error when image has no width metadata', async () => {
    const mockInstance = getMockSharpInstance();
    mockInstance.metadata.mockResolvedValue({
      height: 1500,
      format: 'jpeg',
      // width is missing
    });

    const mockFile = new File(['test'], 'test.jpg', {
      type: 'image/jpeg',
    });

    await expect(optimizeImage(mockFile)).rejects.toThrow(
      'Failed to optimize image: Failed to get image dimensions'
    );
  });

  /**
   * Test: Error handling for Sharp processing failures
   * Verifies: Proper error propagation when toBuffer() fails
   */
  it('should throw error when Sharp processing fails', async () => {
    const mockInstance = getMockSharpInstance();
    mockInstance.toBuffer.mockRejectedValue(new Error('Processing failed'));

    const mockFile = new File(['test'], 'test.jpg', {
      type: 'image/jpeg',
    });

    await expect(optimizeImage(mockFile)).rejects.toThrow(
      'Failed to optimize image: Processing failed'
    );
  });

  /**
   * Test: File to Buffer conversion
   * Verifies: File.arrayBuffer() is called and converted to Buffer correctly
   */
  it('should convert File to Buffer correctly', async () => {
    const mockFile = new File(['test-data'], 'test.jpg', {
      type: 'image/jpeg',
    });

    await optimizeImage(mockFile);

    expect(sharp).toHaveBeenCalledWith(expect.any(Buffer));
  });

  /**
   * Test: Output Blob format and size
   * Verifies: Result is a valid Blob with WebP type and non-zero size
   */
  it('should return a Blob with correct type', async () => {
    const mockFile = new File(['test'], 'test.jpg', {
      type: 'image/jpeg',
    });

    const result = await optimizeImage(mockFile);

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe('image/webp');
    expect(result.size).toBeGreaterThan(0);
  });
});
