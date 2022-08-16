
import {BASE_URL} from 'pages/api/fetch';


export default async function postMissionJoin(missionId, userId){
    const t =localStorage.getItem('access-token')
    const token = t.substring(1,t.length-1)
    const Token = `Bearer ${localStorage.getItem('access-token')}`

    const response = await fetch(`${BASE_URL}mission/join?userId=${userId}&missionId=${missionId}`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        }
    });
    const data = await response
    console.log(data)
    return data
}