
import { BASE_URL, Token } from 'pages/api/fetch';


export default async function searchMission(ctx){
    

    const response = await fetch(`${BASE_URL}mission/search?search=${ctx.queryKey[1].cmd}&array=${ctx.queryKey[1].cate}`, {
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