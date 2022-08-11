import { NextApiRequest, NextApiResponse } from "next";


export default async function userData() {


    const response = await fetch(`http://i7c105.p.ssafy.io:8080/user/1`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjU5NTk2MjE2LCJleHAiOjE2NjEzOTYyMTZ9.EFvEjb89aJTp2E9BZGFodNJdlQ034dvQ78YEHwOXjLyuQhnUCQYIlfkh2NUeNYSxHWwu1O_UFosRrODXoSqsAA`,
      })
    })
    .then(res => res.json().catch(()=>{

    }))
		
		// const data = await response.json().catch(()=>{
		// 	renewAccess
		// })
      

  return {data: {response}}
}
