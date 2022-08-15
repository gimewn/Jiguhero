import { ParentsDiv } from 'styles/styled'
import styled from "styled-components";
import Backcomponents from 'components/back';
import Head from 'next/head';
import React, { useState } from 'react';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

const H2 = styled('h2')`
margin-left:20px;
  @media only screen and (max-width: 650px) {
    display:none;
    margin-top:20px;
  }
`

const BgImg = styled("div")`
  position: relative;
  width: 60px;
  height: 60px;
  @media screen and (max-width: 420px){
    width: 50px;
    height: 50px;
  }

  border: 1px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, #ff4848, #ffd362);
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
    @media screen and (max-width: 420px){
    width: 40px;
    height: 40px;
    left: 3.8px;
    top: 3.8px;
  }
  }
`;
const NickNameBlock = styled('div')`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  @media only screen and (max-width: 650px) {
    margin-top: 20px;
  }
`
const NickNameT = styled('a')`
  font-size: medium;
  font-weight: bold;
  margin-left:10px;
`
const HeartDiv = styled('div')`
  display: inline-flex;
  a {
    font-weight: bold;
    font-size: small;
  }
`
const BorderHeart = styled(FavoriteBorderRoundedIcon)`
    color: coral;
    margin-right: 10px;
    font-size: x-large;
    :hover{
        cursor: pointer;
    }
`
const FullHeart = styled(FavoriteRoundedIcon)`
    color: coral;
    margin-right: 10px;
    font-size: x-large;
    :hover{
        cursor: pointer;
    }
`
const TextDiv = styled('div')`
  font-weight: bold;
  font-size: large;
  margin: 5px;
  /* @media only screen and (min-width: 650px) {
    font-size: x-large;
  } */

`
const ContentDiv = styled('div')`

`
const FeedDiv = styled('div')`
  margin-bottom: 30px;
`

function UserFeedDiv() {
  const [heart, setHeart] = useState(false)

  return (
    <FeedDiv>
      <NickNameBlock>
        <BgImg>
          <img src='https://cdn.pixabay.com/photo/2016/11/18/07/45/mark-1833559_960_720.jpg' alt="dd" />
        </BgImg>
        <NickNameT>닉네임 자리입니다</NickNameT>
      </NickNameBlock>

      <img className='feedimage' src='https://cdn.pixabay.com/photo/2016/11/18/07/45/mark-1833559_960_720.jpg' />
      <ContentDiv>
        <TextDiv>
          <span>지구를 지켜요 다함께</span>
        </TextDiv>
        <HeartDiv onClick={() => setHeart(!heart)}>
          {heart ? <FullHeart /> : <BorderHeart />}
          <a>좋아요 50개</a>
        </HeartDiv>
        <hr />
      </ContentDiv>
    </FeedDiv>
  )
}


export default function MissionFeed() {

  return (
    <ParentsDiv>
      {/* 헤더 */}
      <Head>
        <title>대원들의 인증샷 | 지구-방위대</title>
      </Head>
      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <Backcomponents name='대원들의 인증샷'></Backcomponents>

      <H2>🦸🏻 대원들의 인증샷</H2>
      <UserFeedDiv />
      <UserFeedDiv />

    </ParentsDiv>
  )
}