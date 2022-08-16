
import {BASE_URL} from 'pages/api/fetch';

export default async function getGugun(sido){
    const t =localStorage.getItem('access-token')
    const token = t.substring(1,t.length-1)
    const Token = `Bearer ${localStorage.getItem('access-token')}`
 
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