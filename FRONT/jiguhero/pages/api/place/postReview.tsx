
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function postReport(placeId, userId, content, score){
<<<<<<< HEAD
    const response = await fetch(`${BASE_URL}place/review?place_id=${placeId}&user_id=${userId}`, {
=======
    const response = await fetch(`${BASE_URL}place/review?placeId=${placeId}&userId=${userId}`, {
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
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