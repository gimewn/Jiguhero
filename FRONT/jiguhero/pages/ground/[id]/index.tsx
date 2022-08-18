import styled from 'styled-components';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import getPlaceList from 'pages/api/ground/getPlaceList';
import { Back, ConIcon, LocIcon, Place, PlaceAddress, PlaceContent, PlaceGroup, PlaceTitle, WithIcon } from 'pages/ecomarket';
import Modal from 'components/modal';
import getReview from "pages/api/place/getReview";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import getGround from 'pages/api/ground/getGround';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import getIsLike from 'pages/api/ground/getIsLike';
import postLike from 'pages/api/ground/postLike';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import {groundDetail, groundPlaceList, isLikeGround} from 'states/ground';
import getImgList from 'pages/api/place/getImgList';

const Div = styled("div")`
  position: relative;
`;

const Mapping = styled("div")`
z-index: 1;
width: 100vw;
height: calc(100vh - 80px);
@media only screen and (max-width: 650px) {
  height: calc(100vh - 160px);
}
`
const NoLikeHeart = styled(FavoriteBorderRoundedIcon)`
  margin-right:10px;
  color:#FF4848;
`
const YesLikeHeart = styled(FavoriteRoundedIcon)`
  margin-right:10px;
  color:#FF4848;
`
export const InfoBtn = styled(InfoRoundedIcon)`
  color:#98c064;
  position: absolute;
  right:15px;
`
const Content = styled("div")`
  z-index: 995;
  position: absolute;
  top: 20px;
  left: 15px;
  display:flex;
  @media only screen and (max-width: 650px) {
    flex-direction: column;
    left:15px;
    padding:0 auto;
  }
`;
const SearchBox = styled('div')`
  display:flex;
  height:65px;
  background-color: white;
  margin-left:10px;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
  border-radius: 15px;
  box-shadow: 0 0 10px #999999;
  @media only screen and (max-width: 650px) {
    margin:0;
  }
  @media only screen and (max-width: 400px) {
    width:100%;
  }
`
const GroundTitle = styled('p')`
  font-size:18px;
  font-weight: bold;
  margin-right:10px;
`

export default function GroundDetail(){
    const router = useRouter();
    // const [groundId, setGroundId] = useState();
    const [placeList, setPlaceList] = useRecoilState(groundPlaceList)
    const [show, setShow] = useState(false);
    const [choiceP, setChoiceP] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [groundInfo, setGroundInfo] = useRecoilState(groundDetail);
    const [isLike, setIsLike] = useRecoilState(isLikeGround);
    const [userId, setUserId] = useState();
    const [imgList, setImgList] = useState([]);
  
    useEffect(()=>{
        const usersId = JSON.parse(localStorage.getItem('recoil-persist')).userId
        setUserId(usersId)
        if(router.query.id){
          getPlaceList(router.query.id).then((res) => {
              setPlaceList(res);
          })
          getGround(router.query.id).then((res) => {
            setGroundInfo(res)
          })
            getIsLike(router.query.id, JSON.parse(localStorage.getItem('recoil-persist')).userId).then((res) => {
              setIsLike(res)
            })
      }
    }, [])

    
  
    function getFetch(map) {
        var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";      
        for (var i = 0; i < placeList?.length; i++) {
          console.log("placeList", placeList)
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new window.kakao.maps.Size(20, 30);
                // 마커 이미지를 생성합니다
                var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                let item = placeList[i];
                let lat = placeList[i].lat
                let lng = placeList[i].lng
                var latlng = new window.kakao.maps.LatLng(lat, lng);
                // 마커를 생성합니다
                var marker = new window.kakao.maps.Marker({
                  map: map, // 마커를 표시할 지도
                  position: latlng, // 마커를 표시할 위치
                  // title: data[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                  image: markerImage, // 마커 이미지
                });
                window.kakao.maps.event.addListener(marker, 'click', () => {
                  setShow(true)
                  setChoiceP(item)
                });
              }
            }

    function makeMap(lat, lon){
    let mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new window.kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    let map = new window.kakao.maps.Map(mapContainer, mapOption);
    getFetch(map);
    map.setDraggable(true);
  }
    function moveMyGps(){
    if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude; // 위도
        let lon = position.coords.longitude; // 경도
        let locPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        // 지도 중심좌표를 접속위치로 변경합니다
        makeMap(lat, lon);
        });
    }
    }

    useEffect(()=>{
        window.kakao.maps.load(function(){moveMyGps()})
      }, [])
      
    useEffect(() => {
      getReview(choiceP['placeId']).then((res) => {
        setReviews(res)
      })
      getImgList(choiceP['placeId']).then((res) => {
        setImgList(res.imageURL)
      })
    }, [choiceP])

    return(
        <Div>
            <Head>
            <title>활동구역 상세 보기 | 지구-방위대</title>
            </Head>
          <Content>
          <SearchBox>
          <Back
            onClick={() => {
              router.back();
            }}
          style={{margin:'0 10px'}}
          />
          {groundInfo ? 
          <>
          <GroundTitle>{groundInfo['icon']}</GroundTitle>
          <GroundTitle>{groundInfo['title']}</GroundTitle>
          {isLike ? <YesLikeHeart onClick={()=>{
            if (userId){
              postLike(groundInfo['groundId'], userId).then((res) => {
                setIsLike(!isLike)})}}
            }
             /> : <NoLikeHeart 
          onClick={()=>{
            if(userId){
              postLike(groundInfo['groundId'], userId).then((res) => setIsLike(!isLike))
            }}
            }
          />}
          </>
          : <></>}
          </SearchBox>
          </Content>
            <PlaceGroup>
        {placeList?.map((item) => (
          <Place
            key={item.placeId}
            onClick={() => {
              setChoiceP(item);
              makeMap(item.lat, item.lng)
            }}
          >
            <InfoBtn className='detailBtn'
            onClick={()=>{setShow(true)}}
            />
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
      <Modal show={show} setshow={setShow} data={choiceP} reviews={reviews} imgList={imgList}>
      </Modal>
        <Mapping id="map" />
        </Div>
    )
}