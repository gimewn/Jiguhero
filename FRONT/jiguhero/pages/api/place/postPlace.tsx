
import {BASE_URL, Token} from 'pages/api/fetch';


export default async function postPlace(PlaceProps){
    const response = await fetch(`${BASE_URL}place/`, {
        method:'POST',
        headers:{
            "Authorization" : Token,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "content": '',
            "jibunAddress": PlaceProps.address_name,
            "lat": PlaceProps.y,
            "lng": PlaceProps.x,
            "name": PlaceProps.place_name,
            "phone": PlaceProps.phone,
            "placeId": PlaceProps.id,
            "radius": 0,
            "roadAddress": PlaceProps.road_address_name,
            "url": PlaceProps.place_url
        })
    });
    const data = await response.json()
    return data
}