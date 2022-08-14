
import { BASE_URL, Token } from 'pages/api/fetch';


export default async function PostMission(){
    const response = await fetch(BASE_URL+'mission', {
        method:'POST',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {

    })
    return data
}