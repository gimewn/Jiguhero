import {BASE_URL, Token} from 'pages/api/fetch';

// export default async function missionUserData(req: NextApiRequest) {
export default async function missionUserData(promotionId) {
  const response = await fetch(`${BASE_URL}promotion/get/${promotionId}`, {
    method: "GET",
    headers: {
      Authorization: Token
    },
  });
  const data = await response.json().catch(() => {

  });

  return data;
}