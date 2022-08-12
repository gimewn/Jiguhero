import { NextFetchEvent, NextResponse } from "next/server"
import type { NextRequest } from 'next/server'

import withAuth from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

export { default } from "next-auth/middleware"

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	
		return NextResponse.rewrite(req.nextUrl)
	
}


export const config = {
	matcher: ['/mission/:path*', '/mypage/:path*', ]
	// matcher: ['/:path*']
}



