import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = [], redirectPath: string = '/') {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathName = req.nextUrl.pathname;
    const token = await getToken({
      req,
      secret: process.env.NEXT_AUTH_SECRET
    });

    // console.log("ini token : ", token);

    const role = token?.isRole || '';

    // Jika halaman memerlukan autentikasi dan pengguna belum login, redirect ke halaman login
    if (requireAuth.includes(pathName) && !token) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Jika pengguna sudah login dan mencoba mengakses '/' atau '/Login', redirect ke halaman yang ditentukan
    if (token && (pathName === '/login')) {
      const redirectPath = role === 'ADMIN' ? '/admin/dashboard' : role === 'USER' ? '/user/dashboards' : '/';
      const url = new URL(redirectPath, req.url);
      return NextResponse.redirect(url);
    }

    // Jika pengguna sudah login dan mencoba mengakses halaman yang memerlukan autentikasi, izinkan akses
    if (requireAuth.includes(pathName) && token) {
      if (role === 'ADMIN') {
        // Jika role adalah ADMIN, izinkan akses hanya ke halaman admin
        if (pathName.startsWith('/admin/')) {
          return middleware(req, next);
        }
      } else if (role === 'USER') {
        // Jika role adalah USER, izinkan akses hanya ke halaman user
        if (pathName.startsWith('/user/')) {
          return middleware(req, next);
        }
      }
      // Jika role tidak cocok dengan halaman yang diizinkan, redirect ke halaman yang sesuai
      const redirectPath = role === 'ADMIN' ? '/admin/dashboard' : role === 'USER' ? '/user/dashboards' : '/';
      const url = new URL(redirectPath, req.url);
      return NextResponse.redirect(url);
    }

    // Izinkan akses untuk halaman yang tidak memerlukan autentikasi
    return middleware(req, next);
  };
}