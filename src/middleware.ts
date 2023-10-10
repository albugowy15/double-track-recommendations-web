import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      req.nextauth.token?.role !== 'admin'
    )
      return NextResponse.rewrite(new URL('/403?message=Forbidden', req.url));

    if (
      req.nextUrl.pathname.startsWith('/siswa') &&
      req.nextauth.token?.role !== 'siswa'
    )
      return NextResponse.rewrite(new URL('/403?message=Forbidden', req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ['/admin/:path*', '/siswa/:path*'],
};
