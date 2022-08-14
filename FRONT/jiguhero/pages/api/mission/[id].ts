import { NextApiRequest, NextApiResponse } from "next";
import renewAccess from "../auth/renewAccess";
import {BASE_URL, Token} from 'pages/api/fetch';

// export default async function missionUserData(req: NextApiRequest) {
export default async function missionUserData() {
  const response = await fetch(BASE_URL+'mission/1/details?userId=1', {
    method: "GET",
    headers: {
      Authorization: Token
    },
  });
  const data = await response.json().catch(() => {
    renewAccess;
  });

  return data;
}

// export default async function GetMissionDetail(){
//     const response = await fetch(BASE_URL+'mission/{id}', {
//         method:'GET',
//         headers:{
//             Authorization : Token
//         }
//     });
//     const data = await response.json().catch(() => {
//         renewAccess;
//     })
//     return data
// }
