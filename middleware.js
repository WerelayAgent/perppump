import { NextResponse } from 'next/server';

export function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/api/') || req.nextUrl.pathname.startsWith('/_next/data/')) {
        const url = new URL(req.url);
        
        // Rewrite to purps.lol
        const targetUrl = new URL(req.nextUrl.pathname + req.nextUrl.search, 'https://purps.lol');
        
        const headers = new Headers(req.headers);
        headers.set('host', 'purps.lol');
        headers.set('origin', 'https://purps.lol');
        headers.set('referer', 'https://purps.lol/');
        
        return NextResponse.rewrite(targetUrl, {
            request: {
                headers: headers,
            },
        });
    }
}

export const config = {
    matcher: ['/api/:path*', '/_next/data/:path*'],
};
