import { BASE_URL} from "pages/api/fetch";


export default async function postReport(placeId, userId, category, content){
    const t =localStorage.getItem('access-token')
    const token = t.substring(1,t.length-1)
    const Token = `Bearer ${localStorage.getItem('access-token')}`
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
