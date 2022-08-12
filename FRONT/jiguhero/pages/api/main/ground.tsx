import renewAccess from "../auth/renewAccess";
import {BASE_URL, Token} from 'pages/api/fetch';

export default async function getGround(){
    const response = await fetch(BASE_URL+'home/ground', {
        method:'get',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {
        renewAccess;
    })
    return data
}