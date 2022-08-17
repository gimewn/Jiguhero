
import {BASE_URL} from 'pages/api/fetch';


export default async function putGround(userId, groundId, emoji, title, content){
    const t = localStorage.getItem("access-token");
    let token;
    if (t.includes('"')){
      const res = t.substring(1, t.length - 1);
      token = `Bearer ${res}`
    }else{
      token = `Bearer ${localStorage.getItem('access-token')}`
    }
    // const token = t.substring(1, t.length - 1);
    // const Token = `Bearer ${localStorage.getItem('access-token')}`
  
    const response = await fetch(`${BASE_URL}ground/?userId=${Number(userId)}&groundId=${Number(groundId)}`, {
        method:'PUT',
        headers:{
            "Authorization" : token,
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