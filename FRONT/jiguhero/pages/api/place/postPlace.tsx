
import {BASE_URL} from 'pages/api/fetch';


export default async function postPlace(PlaceProps){
    const t = localStorage.getItem("access-token");
    let token;
    if (t.includes('"')){
      const res = t.substring(1, t.length - 1);
      token = `Bearer ${res}`
    }else{
      token = `Bearer ${localStorage.getItem('access-token')}`
    }
    // const token = t.substring(1, t.length - 1);
    // const Token = `Bearer ${localStorage.getItem('access-token')}`
  
    const response = await fetch(`${BASE_URL}place/`, {
        method:'POST',
        headers:{
            "Authorization" : token,
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
    const data = await response
    return data
}