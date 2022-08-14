
import {BASE_URL, Token} from 'pages/api/fetch';

export default async function getPlaceList(groundId){
    const response = await fetch(`${BASE_URL}ground/place/${Number(groundId)}`, {
        method:'get',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json()
    return data
}