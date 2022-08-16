
import {BASE_URL} from 'pages/api/fetch';

export default async function deleteReview(reviewId){
    const t =localStorage.getItem('access-token')
    const token = t.substring(1,t.length-1)
    const Token = `Bearer ${localStorage.getItem('access-token')}`
    const response = await fetch(`${BASE_URL}place/review/${reviewId}`, {
        method:'delete',
        headers:{
            "Authorization" : Token
        }
    });
    const data = await response
    return data
}