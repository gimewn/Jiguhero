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

const NavBar = styled('div')`
  z-index: 999;
 position: fixed;
  left: 0;
  right: 0;
  top:60px;
  height: 60px;
  /* padding: 2rem; */
  color: white;
  background: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
    @media only screen and (min-width: 650px) {
    display:none;
  }
`

const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  margin: 0px 5px 0px 20px;
`;
const BackCompo = styled(Backcomponents)`
  margin-top: 10px;
  margin-bottom: 10px;
`
const MissioWrapper = styled('div')`
  display:flex;
  flex-direction: column;
  margin-top: 27px;
`


const Block = styled('div')`
  margin: 0.4rem;
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

const BtnContent = styled('div')`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
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

const Text = styled('a')`
  font-weight: bold;
`

const BoxInput = styled('input')`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  padding:3px;
  width: 13rem;
  margin-left: 10px;
  padding: 5px;
`
const DateInput = styled(DatePicker)`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  width: 100px;
  box-sizing: border-box;
  padding: 5px;
  margin-right:9px;
  margin-left:9px;
`
const DateWrapper = styled('div')`
  display: inline-flex;

`

const SelectSido = styled('select')`
    border: #65ACE2 solid 1px;
    background-color: white;
    border-radius: 15px;
    padding:3px;
    margin: 0.5rem;
     
`

const SelectGugun = styled(SelectSido)`
`

const SelectDong = styled(SelectSido)`

`
const CameraBox = styled('form')`
  width: 250px;
  height: 200px;
  background-color: #FFffff;
  border-radius: 15px;
  box-shadow: 0px 0px 5px 0px #dadce0 inset;
  border: 0;
  display:flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 360px){
    width: 200px;
    height: 150px;
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
  padding: 5px;
`
const PeopleInput = styled(PointInput)`
`

const MissionText = styled('textarea')`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  width: 300px;
  height: 100px;
  margin-top: 10px;
`

const SubmitBtn = styled(ButtonFull)`
  width: 300px;
  
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
      <Text>
        임무명
      </Text>
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
      <Text>활동기간</Text>
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
        <a> ~</a>
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
  const [point, setPoint] = useState(0)
  const onChange = (event) => {
    setPoint(event.target.value)
    console.log(event.target.value)
  }
  return (
    <>
      <Text>포인트</Text>
      <PointInput
        onChange={onChange}
        value={point}
        type='number' min="1" max="2000" />
    </>
  )
}
//정원
function JoinPeople() {
  const [people, setPeople] = useState(0)
  const onChange = (event) => {
    setPeople(event.target.value)
    console.log(event.target.value)
  }
  return (
    <>
      <Text>정원</Text>
      <PeopleInput
        onChange={onChange}
        value={people}
        type='number' min="1" />
    </>
  )
}

//미션사진
function MissionPicture() {
  return (

    <CameraBtn>
      <IconButton aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" name="file" />
        <CameraBox>
          <PhotoCamera fontSize="large" />
        </CameraBox>
      </IconButton>
    </CameraBtn>

  )
}

//지역 설정 --- 
function MissionLocation() {

  return (
    <>
      <Text>지역</Text>
      {/* 시도 선택 */}
      <SelectSido>
      </SelectSido>

      {/* 구군 선택 */}
      <SelectGugun>
      </SelectGugun>

      {/* 동 선택 */}
      <SelectDong>
      </SelectDong>

    </>
  )
}

//임무 설명 textarea
function TextArea() {
  const [text, setText] = useState('')
  const onChange = (event) => {
    setText(event.target.value)
    console.log(event.target.value)
  }
  return (
    <>
      <MissionText
        placeholder='임무 설명을 작성해주세요😎'
        onChange={onChange}
        value={text}
      />
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


      <NavBar>
        <Header>
          {/* 모바일 뷰에서 뒤로가기 버튼! */}
          <BackCompo name='임무 생성하기'></BackCompo>
        </Header>
      </NavBar>

      <MissioWrapper>
        {/* 미션사진추가 */}
        <Block>
          <Content>
            <MissionPicture />
          </Content>
        </Block>

        {/* 임무명 */}
        <Block>
          <Content>
            <MissionName />
          </Content>
        </Block>

        {/* 활동기간 */}
        <Block>
          <Content>
            <DatePick />
          </Content>
        </Block>

        {/* 지역 */}
        <Block>
          <Content>
            <MissionLocation />
          </Content>
        </Block>

        {/* 포인트 */}
        <Block>
          <Content>
            <Point />
          </Content>
        </Block>

        {/* 정원 */}
        <Block>
          <Content>
            <JoinPeople />
          </Content>
        </Block>



        {/* 내용쓰기 */}
        <TextArea />

        {/* 등록버튼 */}
        <Block>
          <BtnContent>
            <SubmitBtn
              hColor={'#98C064'}
              dColor={'#65ACE2'}
            // onClick={() => router.push("/")}
            >등록</SubmitBtn>
          </BtnContent>
        </Block>
      </MissioWrapper>

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
