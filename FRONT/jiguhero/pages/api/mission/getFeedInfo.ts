import {BASE_URL, Token} from 'pages/api/fetch';

export default async function getFeedInfo(imgId, userId){
    const response = await fetch(`${BASE_URL}feed/${imgId}?userId=${userId}`, {
        method:'get',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json()
    return data
}