import { NextApiRequest, NextApiResponse } from "next";


export default async function groundUserData(req: NextApiRequest) {
  const t =localStorage.getItem('access-token')
  const token = t.substring(1,t.length-1)
  const Token = `Bearer ${localStorage.getItem('access-token')}`


    const response = await fetch(`http://i7c105.p.ssafy.io:8080/ground/1`, {
      method: "GET",
      headers: new Headers({
        Authorization: Token,
      })
    })
		
		const data = await response.json().catch(()=>{

		})
      

  return data
}