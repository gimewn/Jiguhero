
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function postReport(placeId, userId, content, score){
    const response = await fetch(`${BASE_URL}place/review?place_id=${placeId}&user_id=${userId}`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "content": content,
            "score": score
        })
    });
    const data = await response.json().catch(() => {

    })
    return data
}