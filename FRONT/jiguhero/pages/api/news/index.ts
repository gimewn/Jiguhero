
import { BASE_URL, Token } from "pages/api/fetch";

export default async function getPromotion() {
  const response = await fetch(BASE_URL + "promotion/list", {
    method: "get",
    headers: {
      Authorization: Token,
    },
  });
  const data = await response.json().catch(() => { });
  return data;
}
