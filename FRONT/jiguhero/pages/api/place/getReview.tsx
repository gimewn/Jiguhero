import { BASE_URL, Token } from "pages/api/fetch";

<<<<<<< HEAD
export default async function getReview(placeId) {
  const response = await fetch(`${BASE_URL}place/review/${placeId}`, {
    method: "get",
    headers: {
      Authorization: Token,
    },
  });
  const data = await response.json().catch(() => {});
  return data;
}
=======
export default async function getReview(placeId){
    const response = await fetch(`${BASE_URL}place/review/${placeId}`, {
        method:'get',
        headers:{
            "Authorization" : Token
        }
    });
    const data = await response.json().catch(() => {
        renewAccess;
    })
    return data
}
>>>>>>> cd2e7161a7c788544057dd0a6aa71b0f553158a1
