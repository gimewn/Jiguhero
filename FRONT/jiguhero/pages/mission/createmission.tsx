import styled from "styled-components";
import { ButtonFull, ButtonBorder } from 'styles/styled';
import Backcomponents from 'components/back';
import Head from 'next/head';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { ko } from 'date-fns/esm/locale';
import locale from 'date-fns/locale/ko'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import PostMission from "pages/api/mission/index";
import moment from "moment"

const Block = styled('div')`
  margin: 0.5rem;
`

const Content = styled('div')`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
    @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 550px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    }
`

const BoxInput = styled('input')`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  padding:3px;
  width: 13rem;
  margin-left: 10px;
`
const DateInput = styled(DatePicker)`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  width: 100px;
  box-sizing: border-box;
`
const DateWrapper = styled('div')`
  display: inline-flex;
`

const CameraBox = styled('form')`
  width: 150px;
  height: 150px;
  background-color: #FFffff;
  border-radius: 100px;
  box-shadow: 0px 0px 5px 0px #dadce0 inset;
  border: 0;
  display:flex;
  justify-content: center;
  align-items: center;
  svg {

  }
`
const CameraBtn = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PointInput = styled('input')`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  padding:3px;
  width: 13rem;
  margin-left: 10px;
`
const PeopleInput = styled(PointInput)`
  
`

//임무명
function MissionName() {
  const [text, setText] = useState('')
  const onChange = (event) => {
    setText(event.target.value)
    console.log(event.target.value)
  }
  return (
    <div>
      <a>
        임무명
      </a>
      <BoxInput
        type="text"
        onChange={onChange}
        value={text} />
    </div>
  )
}

//활동기간
function DatePick() {
  const nowTime = moment().format('YYYY-MM-DD')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.log(nowTime)
  console.log(startDate, endDate)
  return (
    <>
      <a>활동기간</a>
      <DateWrapper>

        <DateInput
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          locale={locale}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
        />

        <DateInput
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          locale={locale}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
        />

      </DateWrapper>
    </>
  );
};
//포인트
function Point() {
  return (
    <>
      <a>포인트</a>
      <PointInput type='number' min="1" max="2000" />
    </>
  )
}
//정원
function JoinPeople() {
  return (
    <>
      <a>정원</a>
      <PeopleInput type='number' min="1" />
    </>
  )
}

//인증샷
function MissionPicture() {
  return (
    <>
      <a>인증샷</a>
      <CameraBtn>
        <IconButton aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <CameraBox>
            <PhotoCamera fontSize="large" />
          </CameraBox>
        </IconButton>
      </CameraBtn>
    </>
  )
}

//지역 설정
function MissionLocation() {
  // const [data, setData] = useState([]);
  // const { data: sido } = useQuery(['sido'], getSido);
  // const [ChoiceSido, setChoiceSido] = useState('11');
  // const { data: gugun } = useQuery(['gugun', ChoiceSido], () => getGugun(ChoiceSido), {
  //   enabled: !!ChoiceSido,
  // });
  // const [ChoiceGugun, setChoiceGugun] = useState('11110');
  // const { data: dong } = useQuery(['dong', ChoiceGugun], () => getDong(ChoiceGugun), {
  //   enabled: !!ChoiceGugun
  // })
  // const [ChoiceDong, setChoiceDong] = useState('');
  // let search = false;


  return (
    <>
      {/* <PlaceGroup>
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
      </PlaceGroup> */}


    </>
  )
}

export default function Createmission() {
  return (
    <>
      {/* 헤더 */}
      <Head>
        <title>임무 생성하기 | 지구-방위대</title>
      </Head>

      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <Backcomponents name='임무 생성하기'></Backcomponents>

      <>
        <Block>
          <Content>
            {/* 임무명 */}
            <MissionName />

          </Content>
        </Block>
        {/* 활동기간 */}
        <DatePick />
        {/* 포인트 */}
        <Point />
        {/* 정원 */}
        <JoinPeople />
        {/* 지역 */}

        {/* 인증샷 */}
        <MissionPicture />


      </>


    </>
  )
}

export async function getServerSideProps(context) {
  const createmission = new QueryClient()
  const session = await getSession(context);
  await createmission.prefetchQuery(['mission'], () => { PostMission() })

  return {
    props: {
      data: {
        session,
        dehydratedState: dehydrate(createmission)
      },
    },
  };

}
