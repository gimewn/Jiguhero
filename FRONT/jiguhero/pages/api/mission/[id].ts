import { NextApiRequest, NextApiResponse } from "next";

import {BASE_URL, Token} from 'pages/api/fetch';

// export default async function missionUserData(req: NextApiRequest) {
export default async function missionUserData(missionId, userId) {
  const response = await fetch(`${BASE_URL}mission/${missionId}/details?userId=${userId}`, {
    method: "GET",
    headers: {
      Authorization: Token
    },
  });
  const data = await response.json().catch(() => {

  });
  console.log(data)
  return data;
}
