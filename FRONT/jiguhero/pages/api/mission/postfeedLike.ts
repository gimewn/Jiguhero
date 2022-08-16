
import {BASE_URL} from 'pages/api/fetch';


export default async function postFeedLike(feedId, userId){


    const Token = `Bearer ${localStorage.getItem('access-token')}`

    const response = await fetch(`${BASE_URL}feed/${feedId}/hearts?feedId=${feedId}&userId=${userId}`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        }
    });
    const data = await response
    return data
}