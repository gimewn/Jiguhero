import renewAccess from "../auth/renewAccess";
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function postGround(userId, emoji, title, content){
    const response = await fetch(`${BASE_URL}ground/?user_id=${userId}`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "content": content,
            "icon": emoji,
            "title":title,
            "userId":userId,
        })
    });
    const data = await response.json().catch(() => {
        renewAccess;
    })
    console.log(data)
    return data
}