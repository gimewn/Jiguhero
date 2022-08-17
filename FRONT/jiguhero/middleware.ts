import { Cookies } from 'react-cookie';
import { NextFetchEvent, NextResponse } from "next/server"
import type { NextRequest } from 'next/server'

import withAuth from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
import { useRecoilState, useRecoilValue } from "recoil"
import { UserId, UserName } from "states/user"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"

export { default } from "next-auth/middleware"

export function middleware( req: NextRequest, ev: NextFetchEvent) {
	// const res =NextResponse.next()
	// const cookies = new Cookies(req, res)
	
	// const cookie = req.cookies.get('refreshToken')
	// // const cookie = 	getCookie(req,"refreshToken")
	// console.log(cookie)

	// if(cookie){

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



