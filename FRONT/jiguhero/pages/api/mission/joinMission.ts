
import { BASE_URL, Token } from 'pages/api/fetch';


<<<<<<< HEAD
export default async function JoinMission(userId) {
    

    const response = await fetch(`${BASE_URL}mission/${userId}/joins`, {
=======
export default async function JoinMission() {
    //api 더미 없어서 일단 mission에서 받아옴
    const response = await fetch(BASE_URL+'mission?array=time', {
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
        method:'GET',
        headers:{
            Authorization : Token
        }
    });
    const data = await response.json().catch(() => {

    })
    return data
}
