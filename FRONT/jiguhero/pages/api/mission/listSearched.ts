
import { BASE_URL, Token } from 'pages/api/fetch';


export default async function listSearched(text){

    if(select==="latest") {

    }else{
        
    }
    const response = await fetch(BASE_URL+'mission/', {
        method:'GET',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {
       
    })
    return data
}