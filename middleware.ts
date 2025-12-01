import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  // Проверяем, если это поддомен admin
  if (hostname.startsWith('admin.')) {
    const pathname = request.nextUrl.pathname
    
    // Если уже на админке, пропускаем
    if (pathname.startsWith('/admin')) {
      return NextResponse.next()
    }
    
    // Перенаправляем на админку
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/admin/moderate/jobs', request.url))
    }
    
    // Перенаправляем другие пути на админку
    return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

