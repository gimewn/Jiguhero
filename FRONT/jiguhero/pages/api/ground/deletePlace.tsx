import renewAccess from "../auth/renewAccess";
import {BASE_URL, Token} from 'pages/api/fetch';

export default async function deletePlace(groundId, placeId, userId){
    const response = await fetch(`${BASE_URL}ground/place?placeId=${placeId}&groundId=${groundId}&userId=${userId}`, {
        method:'delete',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {
        renewAccess;
    })
    return data
}