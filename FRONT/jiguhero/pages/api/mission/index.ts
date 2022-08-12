
import { BASE_URL, Token } from 'pages/api/fetch';


export default async function getMission(selector){
    console.log(selector)
    const response = await fetch(`${BASE_URL}mission?array=${selector}`, {
        method:'GET',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch((error) => {
        console.error(error)
    })
    return data
}

