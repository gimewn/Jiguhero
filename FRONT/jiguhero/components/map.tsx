import styled from 'styled-components';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MapDiv = styled('div')`
    width:inherit;
    height:inherit;
    border: ${props => props.bord || 0};
    border-radius: ${props => props.borderR || 0};
`

export default function KakaoMap(){
    const router = useRouter();
    const FullMap = (href) => {
        router.push(href);
    }
    useEffect(() => {

    var mapContainer = document.getElementById('map') // 지도를 표시할 div 
    var mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨 
    };
  
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
    if (navigator.geolocation) {
      
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
          
          var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도
          
          var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다  
          // 지도 중심좌표를 접속위치로 변경합니다
          map.setCenter(locPosition);      
     })}
  })

  return(
    <MapDiv id="map" onClick={() => FullMap("/ecomarket")}>
    </MapDiv>
    )
}