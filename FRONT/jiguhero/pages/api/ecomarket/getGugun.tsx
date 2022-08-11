
import {BASE_URL, Token} from 'pages/api/fetch';

export default async function getGugun(sido){
    const response = await fetch(`${BASE_URL}map/gugun/${sido}`, {
        method:'get',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {
 
    })
    return data
}