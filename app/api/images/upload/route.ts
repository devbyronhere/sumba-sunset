import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/blob/upload';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const pathname = (formData.get('pathname') as string) || undefined;
    const maxWidth = formData.get('maxWidth')
      ? parseInt(formData.get('maxWidth') as string, 10)
      : undefined;
    const quality = formData.get('quality')
      ? parseFloat(formData.get('quality') as string)
      : undefined;

    const result = await uploadImage(file, {
      pathname,
      maxWidth,
      quality,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    const statusCode =
      message.includes('Invalid file type') ||
      message.includes('File size exceeds')
        ? 400
        : 500;

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
