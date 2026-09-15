import { NextResponse } from 'next/server';

export function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // For API routes and _next/data: rewrite to purps.lol with spoofed headers
    // so Cloudflare/purps.lol accepts the request as if it comes from purps.lol itself
    if (pathname.startsWith('/api/') || pathname.startsWith('/_next/data/')) {
        const targetUrl = new URL(pathname + req.nextUrl.search, 'https://purps.lol');

        const headers = new Headers(req.headers);
        headers.set('host', 'purps.lol');
        headers.set('origin', 'https://purps.lol');
        headers.set('referer', 'https://purps.lol/');
        // Use a browser-like user-agent so Cloudflare bot check passes
        headers.set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36');

        return NextResponse.rewrite(targetUrl, {
            request: { headers },
        });
    }
}

export const config = {
    matcher: ['/api/:path*', '/_next/data/:path*'],
};
