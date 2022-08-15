
import { BASE_URL, Token } from 'pages/api/fetch';


export default async function getMission(cate){

   
    const response = await fetch(`${BASE_URL}mission?array=${cate.queryKey[1].cate}`, {
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
