import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = process.env.DIAPILOT_API_URL ?? 'http://127.0.0.1:3002';
  const preview = process.env.NODE_ENV === 'development' ? '?previewDrafts=true' : '';

  try {
    const response = await fetch(
      apiUrl.replace(/\/$/, '') + '/services' + preview,
      { cache: 'no-store' },
    );

    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json(
      { message: 'Service directory is unavailable.' },
      { status: 502 },
    );
  }
}
