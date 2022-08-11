import { BASE_URL, Token } from "pages/api/fetch";

export default async function postReview(placeId, userId) {
  const response = await fetch(
    `${BASE_URL}place/report?place_id=${placeId}&user_id=${userId}`,
    {
      method: "post",
      headers: {
        Authorization: Token,
      },
    }
  );
  const data = await response.json().catch(() => {});
  return data;
}
