import { BASE_URL, Token } from "pages/api/fetch";


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

    })
    return data
}
