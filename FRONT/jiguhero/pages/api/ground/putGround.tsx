
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function putGround(userId, groundId, emoji, title, content){

    const response = await fetch(`${BASE_URL}ground/?userId=${Number(userId)}&groundId=${Number(groundId)}`, {
        method:'PUT',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "content": content,
            "groundId":groundId,
            "icon": emoji,
            "title":title,
            "userId":userId
        })
    });
    const data = await response
    return data
}