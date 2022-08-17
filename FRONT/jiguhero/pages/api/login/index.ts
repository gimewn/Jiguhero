import { useEffect } from "react";







export default async function loginAccess() {
  const t =localStorage.getItem('access-token')
  const token = t.substring(1,t.length-1)
  const Token = `Bearer ${localStorage.getItem('access-token')}`
    
    const response = await fetch(`http://i7c105.p.ssafy.io:8080/oauth2/authorize/kakao?redirect_uri=http://localhost:3000`, {
    method: "GET",
    headers: new Headers({
      Authorization: token,
    }),
  });
  const data = await response.json().catch(()=>{

  })
    return data
}