import {BASE_URL, Token} from 'pages/api/fetch';

export default async function getDetail(missionId, userId){
    const response = await fetch(`${BASE_URL}mission/${missionId}/details?userId=${userId}`, {
        method:'get',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json()
    return data
}