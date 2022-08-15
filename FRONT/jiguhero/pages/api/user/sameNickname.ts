import { Token, BASE_URL } from "pages/api/fetch";

export default async function sameNickname(nickname) {
  const response = await fetch(`${BASE_URL}user/nickname/${nickname}`, {
    method: "GET",
    headers: new Headers({
      Authorization: Token,
    }),
  });

  const data = await response.json().catch(() => {});
  return data;
}
