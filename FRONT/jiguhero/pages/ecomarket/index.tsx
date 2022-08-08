import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Modal from "components/modal";
import { Token, BASE_URL } from "pages/api/fetch";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import SourceRoundedIcon from '@mui/icons-material/SourceRounded';
import { useQuery } from "@tanstack/react-query";
import getSido from 'pages/api/ecomarket/getSido';
import getGugun from 'pages/api/ecomarket/getGugun';
import getDong from 'pages/api/ecomarket/getDong';

const Div = styled("div")`
  position: relative;
`;

export const LocIcon = styled(LocationOnRoundedIcon)`
  font-size:1em;
  color:#98C064;
`
export const ConIcon = styled(SourceRoundedIcon)`
  font-size:1em;
  color:#98C064;
`
export const WithIcon = styled('div')`
  display:flex;
  align-items: baseline;
`
const Content = styled("div")`
  z-index: 995;
  position: absolute;
  top: 20px;
  left: 15px;
  display:flex;
`;
const Title = styled("div")`
  display: flex;
  background-color: white;
  box-shadow: 0 0 10px #999999;
  padding: 10px 10px;
  border: 0;
  border-radius: 20px;
  p {
    font-size: 1rem;
    margin-left: 10px;
    font-weight: bold;
  }
  :hover {
    background-color: #d1e5f5;
  }
`;
const PlaceGroup = styled("div")`
  position: absolute;
  z-index: 996;
  width: inherit;
  height: 80%;
  overflow: auto;
  padding: 10px;
  @media only screen and (max-width: 650px) {
    height: 50vh;
    top: 30vh;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
  @media only screen and (min-width: 650px) {
    top: 80px;
    right: 20px;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
`;
const Place = styled("div")`
  background-color: white;
  box-shadow: 0 0 10px #999999;
  padding: 15px 25px;
  border: 0;
  border-radius: 20px;
  width: 350px;
  margin-bottom: 15px;
  p {
    margin: 5px;
  }
  :hover {
    background-color: #65ace2;
    .placeTitle {
      color: #252525;
    }
    .icon{
      color:white;
    }
  }
`;
const PlaceTitle = styled("p")`
  font-size: 18px;
  font-weight: bold;
  color: #65ace2;
`;
const PlaceAddress = styled("p")`
  font-size: 15px;
`;
const PlaceContent = styled("p")`
  font-size: 15px;
  display:block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Back = styled(ArrowBackIosRoundedIcon)`
  color: #98c064;
`;

const Mapping = styled("div")`
  z-index: 1;
  width: 100vw;
  height: calc(100vh - 80px);
  @media only screen and (max-width: 650px) {
    height: calc(100vh - 160px);
  }
  `
const SelectBox = styled('select')`
  height:45px;
  margin-left:10px;
  border:0;
  border-radius: 10px;
  padding:10px;
  display: inline-block;
  font-size:15px;
  -moz-appearance:none;  /* Firefox */
  -webkit-appearance:none;  /* Safari and Chrome */
  appearance:none;  /* 화살표 없애기 공통*/
  box-shadow: 0 0 10px #999999;
`

export default function FullMap(props:any) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [choiceP, setChoiceP] = useState([]);
  const [data, setData] = useState([]);
  const {data:sido} = useQuery(['sido'], getSido);
  const [ChoiceSido, setChoiceSido] = useState('11');
  const {data:gugun} = useQuery(['gugun', ChoiceSido], () => getGugun(ChoiceSido), {
    enabled: !!ChoiceSido,
  });
  const [ChoiceGugun, setChoiceGugun] = useState('11110');
  const {data:dong} = useQuery(['dong', ChoiceGugun], () => getDong(ChoiceGugun), {
    enabled: !!ChoiceGugun
  })
  const [ChoiceDong, setChoiceDong] = useState('');
  let search = false;

  useEffect(() => {
    function getFetch(lat, lon) {
      fetch(BASE_URL + `map?lat=${lat}&lng=${lon}`, {
        method: "get",
        headers: {
          Authorization: Token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res)
          for (var i = 0; i < res?.length; i++) {
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(20, 30);
      
            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            let item = res[i];
            let lat = res[i].lat
            let lng = res[i].lng
            var latlng = new kakao.maps.LatLng(lat, lng);
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: latlng, // 마커를 표시할 위치
              // title: data[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage, // 마커 이미지
            });
            kakao.maps.event.addListener(marker, 'click', () => {
              setShow(true)
              setChoiceP(item)
            });
          }
        }
        );
    }
    var imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    let mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    let map = new kakao.maps.Map(mapContainer, mapOption);
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude; // 위도
        let lon = position.coords.longitude; // 경도
        let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);
        getFetch(lat, lon);
      });
    }
    map.setDraggable(true);
    kakao.maps.event.addListener(map, "center_changed", function () {
      // 지도의  레벨을 얻어옵니다
      let level = map.getLevel();
      // 지도의 중심좌표를 얻어옵니다
      let locPosition = map.getCenter();
      let newLat = locPosition.getLat();
      let newLon = locPosition.getLng();
      console.log(newLat, newLon)
      map.setLevel(level);
      map.setCenter(locPosition);
      getFetch(newLat, newLon);
    });

    if(search){
      var geocoder = new kakao.maps.services.Geocoder();
  
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(`${ChoiceSido} ${ChoiceGugun} ${ChoiceDong}`, function(result, status) {
  
      // 정상적으로 검색이 완료됐으면 
       if (status === kakao.maps.services.Status.OK) {
  
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
    }})}
  }, []);

  return (
    <Div>
      <Content>
        <Title>
          <Back
            onClick={() => {
              router.back();
            }}
          />
        </Title>
        <SelectBox onChange={(e) => {setChoiceSido(e.target.value)}}>
          {sido?.map((item) => (
            <option key={item['sidoCode']} value={item['sidoCode']}>{item['sidoName']}</option>
          ))}
        </SelectBox>
        <SelectBox onChange={(e) => {setChoiceGugun(e.target.value)}}>
          {gugun?.map((item) => (
            <option key={item['gugunCode']} value={item['gugunCode']}>{item['gugunName'].split(" ")[1]}</option>
          ))}
        </SelectBox>
        <SelectBox onChange={(e) => {setChoiceDong(e.target.value)}}>
          {dong?.map((item) => (
            <option key={item['dongCode']} value={item['dongCode']}>{item['dongName'].split(" ")[2]}</option>
          ))}
        </SelectBox>
      </Content>
      <PlaceGroup>
        {data?.map((item) => (
          <Place
            key={item.placeId}
            onClick={() => {
              setShow(true);
              setChoiceP(item);
            }}
          >
            <PlaceTitle className="placeTitle">{item.name}</PlaceTitle>
            <WithIcon>
            <LocIcon className="icon" /><PlaceAddress>{item.roadAddress}</PlaceAddress>
            </WithIcon>
            {item.content ? <WithIcon>
            <ConIcon className="icon" /><PlaceContent>{item.content}</PlaceContent>         
            </WithIcon> : <></>}
          </Place>
        ))}
      </PlaceGroup>
      <Modal show={show} setshow={setShow} data={choiceP}>
        안녕
      </Modal>
      <Mapping id="map" />
    </Div>
  );
}