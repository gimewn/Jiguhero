import { NextFetchEvent, NextResponse } from "next/server"
import type { NextRequest } from 'next/server'
import { getSession, useSession } from "next-auth/react"
import withAuth from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

export { default } from "next-auth/middleware"

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	
	const session = await getToken({req:req, secret: process.env.SECRET })
	console.log(session)
	if (session) {
		
		return NextResponse.rewrite(req.nextUrl)
	}else{
		return NextResponse.rewrite(`http://localhost:3000/login`)
	}
}


export const config = {
	matcher: ['/mission/:path*', '/mypage/:path*', ]
}
