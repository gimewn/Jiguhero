import { BASE_URL, Token } from "pages/api/fetch";

export default async function getMission() {
  const response = await fetch(BASE_URL + "home/mission", {
    method: "get",
    headers: {

    },
  });
  const data = await response.json().catch(() => {});
  return data;
}
