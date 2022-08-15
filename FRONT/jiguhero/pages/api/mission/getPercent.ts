import {BASE_URL, Token} from 'pages/api/fetch';

export default async function getPercent(missionId, userId){
    const response = await fetch(`${BASE_URL}mission/${missionId}/rate?userId=${userId}`, {
        method:'get',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json()
    return data
}