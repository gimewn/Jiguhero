import { NextApiRequest, NextApiResponse } from "next";
import renewAccess from "../auth/renewAccess";

export default async function groundUserData(req: NextApiRequest) {


    const response = await fetch(`http://i7c105.p.ssafy.io:8080/ground/1`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjU5NTk2MjE2LCJleHAiOjE2NjEzOTYyMTZ9.EFvEjb89aJTp2E9BZGFodNJdlQ034dvQ78YEHwOXjLyuQhnUCQYIlfkh2NUeNYSxHWwu1O_UFosRrODXoSqsAA`,
      })
    })
		
		const data = await response.json().catch(()=>{
			renewAccess
		})
      

  return data
}