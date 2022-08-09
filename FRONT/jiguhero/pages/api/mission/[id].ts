import { NextApiRequest, NextApiResponse } from "next";
import renewAccess from "../auth/renewAccess";
import {BASE_URL, Token} from 'pages/api/fetch';

// export default async function missionUserData(req: NextApiRequest) {
//   const response = await fetch(BASE_URL+'mission/1', {
//     method: "GET",
//     headers: new Headers({
//       Authorization: Token
//     }),
//   });
//   const data = await response.json().catch(() => {
//     renewAccess;
//   });

//   return data;
// }

export default async function PostMission(){
    const response = await fetch(BASE_URL+'mission/', {
        method:'post',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {
        renewAccess;
    })
    return data
}
