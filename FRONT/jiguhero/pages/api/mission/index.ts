
import { BASE_URL, Token } from 'pages/api/fetch';


<<<<<<< HEAD
export default async function getMission(ctx){
   
    const response = await fetch(`${BASE_URL}mission?array=1`, {
=======
export default async function getMission(){
    const response = await fetch(BASE_URL+'mission?array=time', {
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
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
