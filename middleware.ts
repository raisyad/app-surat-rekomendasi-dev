import { NextRequest, NextResponse } from "next/server";
import withAuth from './config/withAuth';
 
// This function can be marked `async` if using `await` inside
export function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res
}

const protectedRoutes = [
  "/user/dashboards",
  "/user/laporankegiatan",
  "/user/mailbox",
  "/user/suratrekomendasi",
  "/admin/dashboard",
  "/admin/mailbox",
  "/admin/profile",
  "/admin/user",
];

// /DataDiri/:path*
export default withAuth(mainMiddleware, protectedRoutes, '/');