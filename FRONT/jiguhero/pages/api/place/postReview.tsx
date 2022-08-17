
import {BASE_URL} from 'pages/api/fetch';


export default async function postReport(placeId, userId, content, score){
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
  
    const response = await fetch(`${BASE_URL}place/review?placeId=${placeId}&userId=${userId}`, {
        method:'POST',
        headers:{
            "Authorization" : token,
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