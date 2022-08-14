
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function postGround(placeId, groundId, userId){

    const response = await fetch(`${BASE_URL}ground/place?placeId=${placeId}&groundId=${Number(groundId)}&userId=${Number(userId)}`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json()
    return data
}