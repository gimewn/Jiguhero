import { NextFetchEvent, NextResponse } from "next/server"
import type { NextRequest } from 'next/server'

import withAuth from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
import { useRecoilState, useRecoilValue } from "recoil"
import { UserId, UserName } from "states/user"
import { useEffect, useState } from "react"

export { default } from "next-auth/middleware"

export async function middleware( req: NextRequest, ev: NextFetchEvent) {
	


	// const cookie = req.cookies["refreshToken"]

	// if(userId){

	// 	return NextResponse.rewrite(req.nextUrl)
	// }else{
	// 	return NextResponse.redirect('/login')
	// }
	return NextResponse.rewrite(req.nextUrl)
}


export const config = {
	matcher: ['/mission/:path*', '/mypage/:path*', ]
	// matcher: ['/:path*']
}



