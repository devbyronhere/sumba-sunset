import { NextRequest, NextResponse } from 'next/server';
import { blobClient } from '@/lib/blob/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const prefix = searchParams.get('prefix') || undefined;

    const result = await blobClient.list(prefix ? { prefix } : undefined);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'List failed';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
