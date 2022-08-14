import renewAccess from "../auth/renewAccess";
import {BASE_URL, Token} from 'pages/api/fetch';

export default async function deleteGround(groundId, userId){
    const response = await fetch(`${BASE_URL}ground/?groundId=${groundId}&userId=${userId}`, {
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