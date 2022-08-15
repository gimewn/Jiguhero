
import { BASE_URL, Token } from 'pages/api/fetch';

export default async function getMission(){
    const response = await fetch(`${BASE_URL}mission?array=title`, {
        method:'GET',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch((error) => {
        console.error(error)
    })
    console.log(data)
    return data
}