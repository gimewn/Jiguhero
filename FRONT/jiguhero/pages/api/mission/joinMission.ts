import renewAccess from "../auth/renewAccess";
import { BASE_URL, Token } from 'pages/api/fetch';


export default async function JoinMission(){
    const response = await fetch(BASE_URL+'mission/1/joins', {
        method:'GET',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {
        renewAccess;
    })
    return data
}
