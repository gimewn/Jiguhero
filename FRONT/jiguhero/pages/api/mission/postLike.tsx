
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function postMissionLike(missionId, userId){

    const response = await fetch(`${BASE_URL}mission/${missionId}/hearts?userId=${userId}`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        }
    });
    const data = await response
    return data
}