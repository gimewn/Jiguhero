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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
          dateFormat="yyyy/MM/dd"
        />

        <DateInput
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          locale={locale}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy/MM/dd"
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
        {/* 임무명 */}
        <MissionName />
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
