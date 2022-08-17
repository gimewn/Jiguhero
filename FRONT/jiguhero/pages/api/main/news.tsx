
import { BASE_URL, Token } from "pages/api/fetch";

export default async function getNews() {
  const response = await fetch(BASE_URL + "home/promotion", {
    method: "get",
    headers: {

    },
  });
  const data = await response.json().catch(() => { });
  return data;
}

