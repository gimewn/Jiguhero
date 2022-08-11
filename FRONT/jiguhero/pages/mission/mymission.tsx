import styled from "styled-components";
import { ButtonFull, ButtonBorder } from 'styles/styled';
import Backcomponents from 'components/back';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { tabpage } from "states/mypage";
import { RecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import React, { useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

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
const Div = styled('div')`
    padding: 18px;
`

const List = styled('div')`
  border: 1px solid #98C064;
  border-radius: 15px;
  height: 150px;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 5px;
  :hover{
    cursor: pointer;
  }

  @media screen and (min-width: 360px){
      width:350px;

  }
  @media screen and (min-width:450px){
      width: 350px;
  }
  @media screen and (min-width: 700px) and (max-width:1400){
      width:500px;
  }
`
/* const ListImg = styled('div') <{ image: string }>` * /
/* background-image: url('${(props) => props.image}'); */
const ListImg = styled('div')`
  background-image: url('https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_960_720.jpg');
  background-size: cover;
  background-position: center;
  width: 150px;
  height: 150px;
  border: 1px solid none;
  float: left;
`
const ListContent = styled('div')`
  width: 200px;
  height: 150px;
  border: 1px solid none;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`

const TextWrapper = styled('div')`
  margin: 4px;
`

const TitleName = styled('a')`
  font-size: 1rem;
  font-weight: bolder;
`
const Name = styled('a')`
  font-size: 0.75rem;
`
const Date = styled(Name)`
  `
const JoinPeople = styled(Name)`
  `
const PointBtn = styled('div')`
  border-radius: 12.5px;
  padding: 5px;
  border: 1px solid #98C064;
  background-color: #98C064;
  color: white;
  font-size: x-small;
  margin-left: auto;
  margin-right: 15px;
`
const ListWrapper = styled('div')`
  display: flex;
  justify-content:center;
  align-items: center;
`
const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin: 20px;
`

interface IBackColor {
  backColor: string,
}
const AchieveBtn = styled('button')`
  border: solid 1px black;
  background-color: ${(props: IBackColor) => props.backColor};
  color: white;
  font-size: medium;
  padding-left:10px;
  padding-right:10px;
  text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
  :hover{
    cursor: pointer;
  }
`

const CertifyBtn = styled('button')`
  border: solid 1px;
  border: solid 1px black;
  background-color: ${(props: IBackColor) => props.backColor};
  color: white;
  font-size: medium;
  text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
  padding-left:10px;
  padding-right:10px;
  :hover{
    cursor: pointer;
  }
`
const AchieveWrapper = styled('div')`
  display:flex;
  justify-content: left;

`
const CertifyWrapper = styled('div')`
  display:flex;
  justify-content: space-between;

`
const CertifyGoBtn = styled(ButtonFull)`
  padding: 3px 10px;
  border-radius: 10px;
  margin-left: 25px;
  margin-right: 25px;
`
const Text = styled('a')`
  font-size: small;
  font-weight: bold;
  margin-left: 25px;
  margin-right: 25px;
`

const Progress = styled(ProgressBar)`
  width: 250px;
  /* .wrapper{
    width: 250px;
  }
  .barCompleted{
    background-color: #65ACE2;
    width: ${(props) => props.completed};
  }
  .container{
    background-color: black;
  } */
`
// interface MissionProps {
//   entryPoint: number;
//   title: string;
//   startDate: number;
//   endDate: number;
//   sidoCode: string;
//   nowPerson: number;
//   maxPerson: number;
//   repImageURL: string;
//   missionId: number;
// }

//내가 참여중인 미션 보여주는 함수
function NowMission() {
  const router = useRouter();
  return (
    <>
      <List onClick={() => router.push(`/ mission / `)}>
        {/* <ListImg image={repImageURL} /> */}
        <ListImg />
        <ListContent>
          <div>
            <TextWrapper>
              <TitleName>제목</TitleName>
            </TextWrapper>
            <TextWrapper>
              <Name>지역</Name>
            </TextWrapper>
            <TextWrapper>
              <Date>시작 날짜~끝 날짜</Date>
            </TextWrapper>
            <TextWrapper>
              <JoinPeople>1 / 5명</JoinPeople>
            </TextWrapper>
          </div>
          <PointBtn>+200</PointBtn>
        </ListContent>
      </List>
    </>
  )
}

function ButtonGroup() {
  // 탭 전환
  const tab = useRecoilValue(tabpage);
  const setTab = useSetRecoilState(tabpage);

  //달성률 버튼 클릭하면 연두색 인증샷 버튼 클릭하면 하얀색!
  const [tabColor, setTabColor] = useState(true)
  return (
    <>
      {/* 탭 전환을 위한 버튼들 */}
      <ButtonWrapper>
        {tabColor ?
          <AchieveBtn backColor={`#98C064`} onClick={() => { setTabColor(!tabColor) }}>달성률</AchieveBtn>
          : <AchieveBtn backColor={`#fffff`} onClick={() => { setTabColor(!tabColor) }}>달성률</AchieveBtn>
        }
        {tabColor ?
          <CertifyBtn backColor={`#fffff`} onClick={() => { setTabColor(!tabColor) }}>인증샷</CertifyBtn>
          : <CertifyBtn backColor={`#98C064`} onClick={() => { setTabColor(!tabColor) }}>인증샷</CertifyBtn>
        }
      </ButtonWrapper >

    </>
  )
}
//달성률과 나의 인증샷 보여주는 탭
function Achievement() {
  return (
    <>
      {/* 달성률 바 */}
      <AchieveWrapper>
        <Text>달성률</Text>
        <Progress completed={60} />
      </AchieveWrapper>

      {/* 내 인증샷 모아보기 */}
      <CertifyWrapper>
        <Text>나의 인증샷</Text>
        <CertifyGoBtn hColor={'#65ACE2'} dColor={'#98C064'}>인증하기</CertifyGoBtn>
      </CertifyWrapper>

    </>
  )
}

//다른 사람들의 인증샷을 보여주는 탭
function Certification() {

  return (
    <>

    </>
  )
}

export default function MyMissionFeed() {
  return (
    <>
      {/* 헤더 */}
      <Head>
        <title>나의 임무 | 지구-방위대</title>
      </Head>
      {/* 네브바 */}
      <NavBar>
        <Header>
          {/* 모바일 뷰에서 뒤로가기 버튼! */}
          <BackCompo name='나의 임무'></BackCompo>
        </Header>
      </NavBar>

      <Div></Div>
      {/* 참여중인 미션 보여줌! */}
      <ListWrapper>
        <NowMission />
      </ListWrapper>

      {/* 달성률 인증샷 탭 */}
      <ButtonGroup />

      <Achievement />

    </>
  )
}