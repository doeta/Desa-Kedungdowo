import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './lib/auth'

export async function middleware(request: NextRequest) {
  // Hanya proses jika me-request rute admin (kecuali API lokal atau static assets)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = await getSession();

    if (!session) {
      // Redirect ke login jika tidak ada sesi
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Jika sudah login tapi akses /login, redirect ke admin
  if (request.nextUrl.pathname.startsWith('/login')) {
    const session = await getSession();
    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
