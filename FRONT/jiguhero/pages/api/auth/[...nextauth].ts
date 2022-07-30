import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID as string,
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
//   callbacks: {
//     async session({ session, token, user }) {
//       // Send properties to the client, like an access_token from a provider.
//       session.user.id = token.sub as string;
//       // console.log("token", token);
//       return session;
//     },
//   },
});