/*global kakao*/ 

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import {useQuery} from '@tanstack/react-query';
import {Token, BASE_URL} from 'pages/api/fetch';


const MapDiv = styled('div')`
    width:inherit;
    height:inherit;
    z-index:1;
`

export default function KakaoMap(){
    const router = useRouter();
    const FullMap = (href) => {
        router.push(href);
    }
    useEffect(() => {
        let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };
        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        let map = new kakao.maps.Map(mapContainer, mapOption); 
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude // 위도
            let lon = position.coords.longitude; // 경도
            let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다  
              // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);
            console.log(lat, lon);
            })}
    }, []);
  return(
    <MapDiv id="map" onClick={() => FullMap("/ecomarket")}>
    </MapDiv>
    )
}