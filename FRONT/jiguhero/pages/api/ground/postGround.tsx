
import {BASE_URL} from 'pages/api/fetch';


export default async function postGround(userId, emoji, title, content){
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
  
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);
    var regtime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

    const response = await fetch(`${BASE_URL}ground/?userId=${Number(userId)}`, {
        method:'POST',
        headers:{
            "Authorization" : token,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "title":title,
            "icon": emoji,
            "content": content,
            "regtime":regtime
        })
    });
    const data = await response
    return data
}