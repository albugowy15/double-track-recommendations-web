import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/403", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/siswa") &&
      request.nextauth.token?.role !== "student"
    ) {
      return NextResponse.rewrite(new URL("/403", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/siswa/:path*"],
};
