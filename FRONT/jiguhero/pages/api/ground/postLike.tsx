
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function postGround(groundId, userId){

    const response = await fetch(`${BASE_URL}ground/like?groundId=${groundId}&userId=${userId}`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        }
    });
    const data = await response
    return data
}