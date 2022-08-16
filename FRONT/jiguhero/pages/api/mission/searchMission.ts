
import { BASE_URL } from 'pages/api/fetch';


export default async function searchMission(ctx){
    const t =localStorage.getItem('access-token')
    const token = t.substring(1,t.length-1)
    const Token = `Bearer ${localStorage.getItem('access-token')}`
    

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