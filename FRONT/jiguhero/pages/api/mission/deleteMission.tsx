
import {BASE_URL, Token} from 'pages/api/fetch';

export default async function deleteMission(missionId, userId){
    const response = await fetch(`${BASE_URL}mission/${missionId}/details?userId=${userId}`, {
        method:'delete',
        headers:{
            Authorization : Token
        }
    });
    const data = await response
    return data
}