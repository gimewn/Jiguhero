import { BASE_URL, Token } from "pages/api/fetch";

export default async function getSido() {
  const response = await fetch(BASE_URL + "map/sido", {
    method: "get",
    headers: {
      Authorization: Token,
    },
  });
  const data = await response.json().catch(() => {});
  return data;
}
