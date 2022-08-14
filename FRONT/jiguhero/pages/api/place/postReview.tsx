
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function postReport(placeId, userId, content, score){
    const response = await fetch(`${BASE_URL}place/review?placeId=${placeId}&userId=${userId}`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "content": content,
            "score": score,
            "userId":userId
        })
    });
    const data = await response.json().catch(() => {

    })
    return data
}