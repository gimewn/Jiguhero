
import {BASE_URL, Token} from 'pages/api/fetch';

export default async function deleteReview(reviewId){
    const response = await fetch(`${BASE_URL}place/review/${reviewId}`, {
        method:'delete',
        headers:{
            "Authorization" : Token
        }
    });
    const data = await response
    return data
}