import renewAccess from "../auth/renewAccess";
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function postGround(userId, emoji, title, content){
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);
    var regtime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

    const response = await fetch(`${BASE_URL}ground/?user_id=${Number(userId)}`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "title":title,
            "icon": emoji,
            "content": content,
            "regtime":regtime,
            "userId":userId
        })
    });
    const data = await response.json().catch(() => {
        renewAccess;
    })
    return data
}