
import { BASE_URL, Token } from 'pages/api/fetch';


export default async function JoinMission(userId) {

    const response = await fetch(`${BASE_URL}mission/${userId}/joins`, {
        method:'GET',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {

    })
    return data
}
