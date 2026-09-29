import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const apiUrl = process.env.DIAPILOT_API_URL ?? 'http://127.0.0.1:3002';
  const preview = process.env.NODE_ENV === 'development' ? '?previewDrafts=true' : '';

  try {
    const response = await fetch(
      apiUrl.replace(/\/$/, '') +
        '/services/' +
        encodeURIComponent(slug) +
        preview,
      { cache: 'no-store' },
    );

    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json(
      { message: 'Service details are unavailable.' },
      { status: 502 },
    );
  }
}
