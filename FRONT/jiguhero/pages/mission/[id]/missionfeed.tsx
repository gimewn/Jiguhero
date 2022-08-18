import { ParentsDiv } from "styles/styled";
import styled from "styled-components";
import Backcomponents from "components/back";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserId } from "states/user";
import {
  allauthImgList,
  feedImgList,
  feedList,
  feedUserInfoList,
} from "states/mission";
import userData from "pages/api/user/[id]";
import getFeedInfo from "pages/api/mission/getFeedInfo";
import { theme } from "components/theme";
import FeedList from "components/feedList";
import { useRouter } from "next/router";
import getDetail from "pages/api/mission/getDetail";

const H2 = styled("h2")`
  margin-left: 20px;
  @media only screen and (max-width: 650px) {
    display: none;
    margin-top: 20px;
  }
`;

const BgImg = styled("div")<{ color1: string; color2: string }>`
  position: relative;
  width: 60px;
  height: 60px;
  @media screen and (max-width: 420px) {
    width: 50px;
    height: 50px;
  }

  border: 1px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.color1},
    ${(props) => props.color2}
  );
  background-origin: border-box;
  background-clip: content-box, border-box;
  img {
    display: flex;
    align-items: center;
    left: 4.5px;
    top: 4.5px;
    justify-content: center;
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    @media screen and (max-width: 420px) {
      width: 40px;
      height: 40px;
      left: 3.8px;
      top: 3.8px;
    }
  }
`;

const NickNameBlock = styled("div")`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  @media only screen and (max-width: 650px) {
    margin-top: 20px;
  }
`;

const NickNameT = styled("a")`
  font-size: medium;
  font-weight: bold;
  margin-left: 10px;
`;
const HeartDiv = styled("div")`
  display: inline-flex;
  a {
    font-weight: bold;
    font-size: small;
  }
`;
const BorderHeart = styled(FavoriteBorderRoundedIcon)`
  color: coral;
  margin-right: 10px;
  font-size: x-large;
  :hover {
    cursor: pointer;
  }
`;
const FullHeart = styled(FavoriteRoundedIcon)`
  color: coral;
  margin-right: 10px;
  font-size: x-large;
  :hover {
    cursor: pointer;
  }
`;
const TextDiv = styled("div")`
  font-weight: bold;
  font-size: large;
  margin: 5px;
  /* @media only screen and (min-width: 650px) {
    font-size: x-large;
  } */
`;
const ContentDiv = styled("div")``;
const FeedDiv = styled("div")`
  margin-bottom: 30px;
`;

export default function MissionFeed() {
  // const [nickname, setNickname]=useState('')
  // const [imgUserId, setImgUserId]=useState()

  const [heart, setHeart] = useState(false);
  // const [imgUserName, setImgUserName] = useState<number>();
  // const [grade, setGrade] = useState<number>();
  const [userId] = useRecoilValue(UserId);
  const [feedLists, setFeedLists] = useRecoilState(feedList);

  // [grade, nickname, feedUserId, imgUrl]
  const [feedUserInfoLists, setFeedUserInfoLists] =
    useRecoilState(feedUserInfoList);

  const [missionList, setMissionList] = useRecoilState(allauthImgList);

  const [feedImgLists, setFeedImgLists] = useRecoilState(feedImgList);
  const [grd, setGrd] = useState<number>();
  const [nick, setNick] = useState<string>();
  const [feedUserId, setFeedUserId] = useState<number>();
  const [imgUrl, setImgUrl] = useState<string>();
  const [list, setList] = useState(); // 피드 작성자 정보 []
  const [feedInfo, setFeedInfo] = useState(); // 피드 인증샷 정보 []

  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");

  const router = useRouter()

  useEffect(()=>{
    if(!localStorage.getItem('access-token')){
      alert("로그인해주세요")
      router.push('/login')
  }else{
    getDetail(router.query.id, JSON.parse(localStorage.getItem('recoil-persist')).userId)
    .then((res)=>setMissionList(res))
    console.log(missionList)
  }
  }, [])

  // useEffect(() => {
  //   if (missionList) {
  //     setFeedLists(missionList.imageURL);

  //     var mama = [];
  //     feedLists.map((item) => {

  //       var data = userData(item[2])
  //         .then((res) => {
  //           if (res.grade === 0) {
  //             setColor1(theme.Bunhong.first);
  //             setColor2(theme.Bunhong.second);
  //           } else if (res.grade === 1) {
  //             setColor1(theme.Norang.first);
  //             setColor2(theme.Norang.second);
  //           } else if (res.grade === 2) {
  //             setColor1(theme.Chorok.first);
  //             setColor2(theme.Chorok.second);
  //           } else if (res.grade=== 3) {
  //             setColor1(theme.Parang.first);
  //             setColor2(theme.Parang.second);
  //           } else if (res.grade=== 4) {
  //             setColor1(theme.Bbalgang.first);
  //             setColor2(theme.Bbalgang.second);
  //           }
  //           setGrd(res.grade);
  //           setNick(res.nickname);
  //           setFeedUserId(res.userId);
  //           setImgUrl(res.imageURL);
  //           var tmp = [color1, color2, nick, feedUserId, imgUrl];

  //           return tmp;
  //         })
  //         .then((res) => {
  //           mama.push(res);
  //           setList(mama);
  //         });
  //     });

  //     setFeedUserInfoLists(list);
  //   }
  // },[]);


  // useEffect(() => {
  //   if (feedLists) {
  //     var ma = [];
  //     feedLists.map((item) => {
  //       getFeedInfo(item[0], userId)
  //         .then((res) => {
  //           var tmpdata = [res.likeCheck, res.content, res.likeCnt];
  //           return tmpdata;
  //         })
  //         .then((res) => {
  //           ma.push(res);
  //           setFeedInfo(ma);
  //         });
  //     });
  //     setFeedImgLists(feedInfo);
  //   }
  // }, [heart]);

  return (

    <ParentsDiv>
      {/* 헤더 */}
      <Head>
        <title>대원들의 인증샷 | 지구-방위대</title>
      </Head>
      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <Backcomponents name="대원들의 인증샷"></Backcomponents>

      <H2>🦸🏻 대원들의 인증샷</H2>


      {missionList ? (
        <>
          {missionList.imageURL?.map((item, index) => {
            console.log(item)            
            return (
              <FeedList {...item} key={index} />
              // <FeedDiv>
              //   <NickNameBlock>
              //     <BgImg color1={feedUserInfoLists[index][0]} color2={feedUserInfoLists[index][1]}>
              //       <img src={feedUserInfoLists[index][4]} />
              //     </BgImg>
              //     <NickNameT>{feedUserInfoLists[index][2]}</NickNameT>
              //   </NickNameBlock>

              //   <img className="feedimage" src={item[1]} />

              //   <ContentDiv>
              //     <TextDiv>
              //       <span>{feedImgLists[index][1]}</span>
              //     </TextDiv>
              //     <HeartDiv
              //       onClick={(e) => {
              //         e.preventDefault();
              //         setHeart(!heart);
              //       }}
              //     >
              //       {feedImgLists[index][0] ? <FullHeart /> : <BorderHeart />}
              //       <a>{`좋아요 ${feedImgLists[index][2]}개`}</a>
              //     </HeartDiv>
              //     <hr />
              //   </ContentDiv>
              // </FeedDiv>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </ParentsDiv>
  );
}
