import NextAuth from "next-auth/next";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string
			image: string
		},
		expires: string
		accessToken: string|unknown
	}
}