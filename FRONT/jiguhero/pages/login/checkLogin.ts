import { useSession } from "next-auth/react";



export default function checkLogin(){
	const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log(session)

  if (session.accessToken) {
    return session
  }
}