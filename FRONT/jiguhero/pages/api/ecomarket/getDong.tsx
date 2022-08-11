
import {BASE_URL, Token} from 'pages/api/fetch';

export default async function getDong(gugun){
    const response = await fetch(`${BASE_URL}map/dong/${gugun}`, {
        method:'get',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {
     
    })
    return data
}