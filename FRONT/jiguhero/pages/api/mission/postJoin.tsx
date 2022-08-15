
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function postMissionJoin(missionId, userId){

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