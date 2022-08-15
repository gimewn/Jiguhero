import { NextApiRequest, NextApiResponse } from "next";


export default async function userMission(userId) {
 
    const token = await JSON.stringify(localStorage.getItem('access-token'))

    const response = await fetch(`https://i7c105.p.ssafy.io:8080/mission/${userId}/hearts`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjU5NTk2MjE2LCJleHAiOjE2NjEzOTYyMTZ9.EFvEjb89aJTp2E9BZGFodNJdlQ034dvQ78YEHwOXjLyuQhnUCQYIlfkh2NUeNYSxHWwu1O_UFosRrODXoSqsAA`,
      })
    })
    const data = await response.json().catch(()=> {

    })
      

  return data
}