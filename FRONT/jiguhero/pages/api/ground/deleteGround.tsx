
import {BASE_URL} from 'pages/api/fetch';

export default async function deleteGround(groundId, userId){
    const t =localStorage.getItem('access-token')
    const token = t.substring(1,t.length-1)
    const Token = `Bearer ${localStorage.getItem('access-token')}`
    const response = await fetch(`${BASE_URL}ground/?groundId=${groundId}&userId=${userId}`, {
        method:'delete',
        headers:{
            Authorization : Token
        }
    });
    const data = await response
    return data
}