import { BASE_URL, Token } from "pages/api/fetch";

<<<<<<< HEAD
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
=======

export default async function postReport(placeId, userId, category, content){
    const response = await fetch(`${BASE_URL}place/report?place_id=${placeId}&user_id=${userId}`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "category": category,
            "content": content,
        })
    });
    const data = await response.json().catch(() => {
        renewAccess;
    })
    return data
}
>>>>>>> cd2e7161a7c788544057dd0a6aa71b0f553158a1
