import { NextRequest, NextResponse } from 'next/server';
import { blobClient } from '@/lib/blob/client';

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Invalid URL provided' },
        { status: 400 }
      );
    }

    await blobClient.delete(url);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Delete failed';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
