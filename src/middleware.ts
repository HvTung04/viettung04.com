import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude admin routes from i18n handling
  if (pathname.startsWith('/admin')) {
    // Protect admin routes (except login)
    if (!pathname.startsWith('/admin/login')) {
      const session = request.cookies.get('admin_session');
      if (!session || session.value !== 'authenticated') {
        return Response.redirect(new URL('/admin/login', request.url));
      }
    }
    // Skip i18n middleware for admin routes
    return;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|vi)/:path*'],
};
