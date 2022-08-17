import { BASE_URL, Token } from "pages/api/fetch";

export default async function getGround() {
  const response = await fetch(BASE_URL + "home/ground", {
    method: "get",
    headers: {

    },
  });
  const data = await response.json().catch(() => {});
  return data;
}
