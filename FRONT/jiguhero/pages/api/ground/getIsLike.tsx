import {BASE_URL, Token} from 'pages/api/fetch';

export default async function getIsLike(groundId, userId){
    console.log(groundId, userId)
    const response = await fetch(`${BASE_URL}ground/like?groundId=${groundId}&userId=${userId}`, {
        method:'get',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json()
    return data
}