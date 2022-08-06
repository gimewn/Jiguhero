



export function middleware() {
	const a =123
	console.log(a)
	return a
}

export const config = {
	matcher: '/:path*'
}
