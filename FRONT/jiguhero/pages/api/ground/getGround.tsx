import {BASE_URL, Token} from 'pages/api/fetch';

export default async function getMyGround(groundId){
    const response = await fetch(`${BASE_URL}ground/get/${groundId}`, {
        method:'get',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json()
    return data
}