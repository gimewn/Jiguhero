import { BASE_URL, Token } from "pages/api/fetch";

export default async function getReview(placeId){
    const response = await fetch(`${BASE_URL}place/review/${Number(placeId)}`, {
        method:'get',
        headers:{
            "Authorization" : Token
        }
    });
    const data = await response.json().catch(() => {

    })
    return data
}
