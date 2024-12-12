import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname

  // If it's an API request and we're in development, proxy to the local API server
  if (process.env.NODE_ENV === 'development' && pathname.startsWith('/api/')) {
    const url = new URL(pathname, 'http://localhost:8000')
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: '/api/:path*',
}
