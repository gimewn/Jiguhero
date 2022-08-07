import styled from 'styled-components';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';
import Modal from 'components/modal';
import {Token, BASE_URL} from 'pages/api/fetch';

const Div = styled('div')`
    position:relative;
`
const Content = styled('div')`
    z-index: 995;
    position:absolute;
    top: 20px;
    left: 15px;
`
const Title = styled('div')`
    display:flex;
    background-color: white ;
    box-shadow: 0 0 10px #999999;
    padding: 10px 10px;
    border: 0;
    border-radius: 20px;
    p {
        font-size: 1rem;
        margin-left: 10px;
        font-weight: bold;
    }
    :hover{
        background-color: #D1E5F5;
    }
`
const PlaceGroup = styled('div')`
    position:absolute;
    z-index: 996;
    width:inherit;
    height:inherit;
    overflow: auto;
    padding:10px;
    @media only screen and (max-width: 650px) {
        height:50vh;
        top:30vh;
        left:0;
        right:0;
        display:flex;
        flex-direction: column;
        justify-content: start;
  }
  @media only screen and (min-width: 651px) {
    top:50px;
    right:20px;
  }
  ::-webkit-scrollbar {
  width: 0;
}
`
const Place = styled('div')`
    background-color: white ;
    box-shadow: 0 0 10px #999999;
    padding: 15px 25px;
    border:0;
    border-radius: 20px;
    width:350px;
    margin-bottom:15px;
    p{
        margin:5px;
    }
    :hover{
        background-color: #65ACE2;
        .placeTitle{
            color:#252525;
        }
    }
`
const PlaceTitle = styled('p')`
font-size: 18px;
font-weight: bold;
color: #65ACE2;
`
const PlaceAddress = styled('p')`
font-size: 15px;
`
const PlaceContent = styled('p')`
font-size: 15px;
`
const Back = styled(ArrowBackIosRoundedIcon)`
    color:#98C064;
`

const Mapping = styled('div')`
    z-index: 1;
    width:100vw;
    height:100rem;
`

export default function FullMap(){
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [choiceP, setChoiceP] = useState([]);
    const [data, setData] = useState([]);

    function getFetch(lat, lon){
        fetch(BASE_URL+`map?lat=${lat}&lng=${lon}`, {
        method:'get',
        headers:{
            Authorization : Token
        }
    }).then((res) => res.json())
    .then((res) => setData(res))
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
            getFetch(lat, lon)
            })}
        kakao.maps.event.addListener(map, 'center_changed', function() {
            // 지도의  레벨을 얻어옵니다
            let level = map.getLevel();
            // 지도의 중심좌표를 얻어옵니다 
            let locPosition = map.getCenter();
            let newLat = locPosition.getLat();
            let newLon = locPosition.getLng();
            console.log(newLat, newLon);
            map.setLevel(level);
            map.setCenter(locPosition);
            getFetch(newLat, newLon);
        })
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    
        for (var i = 0; i < data.length; i ++) {
            
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35); 
            
            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: data[i].latlng, // 마커를 표시할 위치
                title : data[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });
        }
    }, []);
    
    return(
        <Div>
        <Content>
            <Title>
                <Back onClick={() => {router.back()}} />
            </Title>
        </Content>
        <PlaceGroup>
            {data?.map((item) => (<Place key={item.placeId} onClick={()=>{
                setShow(true)
                setChoiceP(item)
            }}>
                <PlaceTitle className="placeTitle">{item.name}</PlaceTitle>
                <PlaceAddress>{item.jibunAddress}</PlaceAddress>
                <PlaceContent>{item.content}</PlaceContent>
            </Place>))}
        </PlaceGroup>
        <Modal show={show} setshow={setShow} data={choiceP}>
            안녕
        </Modal>
        <Mapping id="map" />
        </Div>
    )
}