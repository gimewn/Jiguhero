import styled from "styled-components";
import { ButtonFull, ButtonBorder, ParentsDiv } from 'styles/styled';
import Backcomponents from 'components/back';
import MissionModal from 'components/MissionModal';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { missionTabpage } from "states/mission";
import { RecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import React, { useState, useEffect } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import getDetail from "pages/api/mission/getDetail";
import getDong from "pages/api/ecomarket/getDong";

const Div = styled('div')`
    padding: 18px;
`

const List = styled('div')`
  border: 1px solid #98C064;
  border-radius: 15px;
  width: auto;
  height: auto;
  display:flex;
  /* flex-direction: row; */
  /* align-items: center;
  justify-content: center; */
  overflow: hidden;
  margin: 5px;
  :hover{
    cursor: pointer;
  }

  /* @media screen and (min-width: 360px){
      width:350px;
  }
  @media screen and (min-width:450px){
      width: 350px;
  }
  @media screen and (min-width: 700px) and (max-width:1400){
      width:800px;
  } */
`
const ListImg = styled('div')<{ image: string }>`
  background-image: url(${(props) => props.image});
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
  /* float: left; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`

const TextWrapper = styled('div')`
  margin-left: 15px;
  margin-right: auto;
`

const TitleName = styled('h2')`
  font-size: 1rem;
  font-weight: bolder;
  margin: 0;
`
const Name = styled('p')`
  font-size: 0.75rem;
  margin-top: 5px;
  margin-bottom: 0;
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
  width:100%;
`
const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin: 20px;
`


const AchieveFullBtn = styled(ButtonFull)`
  font-size: medium;
  border-radius: 10px;
  padding: 3px 10px;
  margin: 10px;
  /* text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black; */
  :hover{
    cursor: pointer;
  }
`

const CertifyFullBtn = styled(AchieveFullBtn)`
`
const AchieveBorderBtn = styled(ButtonBorder)`
  font-size: medium;
  border-radius: 10px;
  padding: 3px 10px;
    :hover{
    cursor: pointer;
  }
`
const CertifyBorderBtn = styled(AchieveBorderBtn)`
`

const AchieveWrapper = styled('div')`
  display:flex;
  justify-content: center;
  /* max-width: 500px; */
`
const ProgressWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  
`
const CertifyWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`
const CertifyGoBtn = styled(ButtonFull)`
  padding: 3px 10px;
  border-radius: 10px;
  margin-left: 140px;
  margin-right: 25px;
`
const Text = styled('a')`
  font-size: 15px;
  font-weight: bolder;
  margin-left: 25px;
  margin-right: 25px;
`
const Text2 = styled('a')`
  font-size: 13px;
  margin-left: 4rem;
  margin-right:1rem;
`



//진행률바 라이브러리 이용
const Progress = styled(ProgressBar)`
  max-width: 350px;
  width: 90%;
  
`

const CertifyFeed = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text3 = styled('a')`
  font-size: large;
  font-weight: bolder;
  background-color: #fcfca886;
`

const HeroTextWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NoHeroText1 = styled('a')`
  font-family: PyeongChangPeace-Bold;
  font-size: 100px;
  padding: 50px 0 0 0;
`
const NoHeroText2 = styled('a')`
  font-size: medium;
  font-weight: bold;
`

const BottomDiv = styled('div')`
  margin-bottom: 70px;
`

interface MissionProps {
  entryPoint: number;
  title: string;
  startDate: number;
  endDate: number;
  sidoCode: string;
  nowPerson: number;
  maxPerson: number;
  repImageURL: string;
  missionId: number;
}


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
    <List onClick={() => router.push(`1`)}>
      {/* <ListImg image={repImageURL} /> */}
      <ListImg />
      <ListContent>
        <TextWrapper>
          <TitleName>제목</TitleName>
          <Name>지역</Name>
          <Date>시작 날짜~끝 날짜</Date>
          <JoinPeople>1 / 5명</JoinPeople>
        </TextWrapper>
        {/* </div> */}
        <PointBtn>+200</PointBtn>
      </ListContent>
    </List>
  )
}

//달성률 & 인증샷 버튼 그룹
function ButtonGroup() {
  // 탭 전환
  const tab = useRecoilValue(missionTabpage);
  const setTab = useSetRecoilState(missionTabpage);

  //달성률 버튼 클릭하면 연두색 인증샷 버튼 클릭하면 하얀색!
  const [tabColor, setTabColor] = useState(true)
  console.log(tabColor)
  return (
    <>
      {/* 탭 전환을 위한 버튼들 */}
      <ButtonWrapper>
        {tabColor ?
          <AchieveFullBtn dColor={'#98C064'} hColor={'98C064'} onClick={() => { setTab(true), setTabColor(!tabColor) }}>달성률</AchieveFullBtn>
          : <AchieveBorderBtn dColor={'#65ACE2'} onClick={() => { setTab(true), setTabColor(!tabColor) }}>달성률</AchieveBorderBtn>
        }
        {tabColor ?
          <CertifyBorderBtn dColor={' #65ACE2'} onClick={() => { setTab(false), setTabColor(!tabColor) }}>인증샷</CertifyBorderBtn>
          : <CertifyFullBtn dColor={'#98C064'} hColor={'98C064'} onClick={() => { setTab(false), setTabColor(!tabColor) }}>인증샷</CertifyFullBtn>
        }
      </ButtonWrapper >
      {tab ? <Achievement /> : <Certification />}
    </>
  )
}

//임시 더미파일들
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default function MyMissionFeed() {
  const router = useRouter();
  const tab = useRecoilValue(missionTabpage);
  const setTab = useSetRecoilState(missionTabpage);
  const [Modal, setModal] = useState(false)
  const [missionItem, setMissionItem] = useState();
  const [region, setRegion] = useState();
  useEffect(()=>{
    if(router.query.id){
      getDetail(router.query.id, 1).then((res)=>{setMissionItem(res)
        console.log(res)
      getDong(res.gugunCode).then((item)=>{
        const result = item.filter((dong) => {
          if(dong.dongCode === res.dongCode){
            setRegion(dong.dongName)
              return dong
          }})
      })
      })
    }
  }, [])
  useEffect(() => {
    if (Modal === false) {
      console.log('hihi', Modal)
    } else {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        console.log('bye', Modal)
      };
    }
  }, [Modal]);

  //달성률 버튼 클릭하면 연두색 인증샷 버튼 클릭하면 하얀색!
  const [tabColor, setTabColor] = useState(true)
  return (
    <ParentsDiv>
      {/* 헤더 */}
      <Head>
        <title>나의 임무 | 지구-방위대</title>
      </Head>
      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <Backcomponents name='나의 임무'></Backcomponents>

      <Div></Div>
      {/* 참여중인 미션 보여줌! */}
      <ListWrapper>
      <List onClick={() => router.push(`/mission/${router.query.id}`)}>
        {/* <ListImg image={repImageURL} /> */}
            {missionItem ? <>
        <ListImg image={missionItem.repImageURL} />
        <ListContent>
          <div>
            <TextWrapper>
              <TitleName>{missionItem.title}</TitleName>
            </TextWrapper>
            {region ? <>
            <TextWrapper>
              <Name>{region}</Name>
            </TextWrapper>
            </> : <></>}
            <TextWrapper>
              <Date>{missionItem.startDate}~{missionItem.endDate}</Date>
            </TextWrapper>
            <TextWrapper>
              <JoinPeople>{missionItem.nowPerson} / {missionItem.maxPerson}명</JoinPeople>
            </TextWrapper>
          </div>
          <PointBtn>+{missionItem.entryPoint}</PointBtn>
        </ListContent>
            </> : <></>}
      </List>
      </ListWrapper>

      {/* 달성률 인증샷 탭 */}
       {/* 탭 전환을 위한 버튼들 */}
       <ButtonWrapper>
        {tabColor ?
          <AchieveFullBtn dColor={'#98C064'} hColor={'98C064'} onClick={() => { setTab(true), setTabColor(!tabColor) }}>달성률</AchieveFullBtn>
          : <AchieveBorderBtn dColor={'#65ACE2'} onClick={() => { setTab(true), setTabColor(!tabColor) }}>달성률</AchieveBorderBtn>
        }
        {tabColor ?
          <CertifyBorderBtn dColor={' #65ACE2'} onClick={() => { setTab(false), setTabColor(!tabColor) }}>인증샷</CertifyBorderBtn>
          : <CertifyFullBtn dColor={'#98C064'} hColor={'98C064'} onClick={() => { setTab(false), setTabColor(!tabColor) }}>인증샷</CertifyFullBtn>
        }
      </ButtonWrapper >
      {tab ? 
      <>
      <AchieveWrapper>
        <Text>달성률</Text>
        <Text2>~일만 더 인증하면 성공이에요!</Text2>
      </AchieveWrapper>

      <ProgressWrapper>
        <Progress completed={60} bgColor={'#65ACE2'} />
      </ProgressWrapper>


      <CertifyWrapper>
        <Text>나의 인증샷</Text>
        <CertifyGoBtn hColor={'#65ACE2'} dColor={'#98C064'} onClick={() => setModal(true)}>인증하기</CertifyGoBtn>
        <MissionModal show={Modal} setShow={setModal} />
      </CertifyWrapper>
      <>
      <CertifyFeed>
        <ImageList sx={{ width: 350 }} cols={3} rowHeight={130}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </CertifyFeed>
    </>

      </>
       : 
       <>
       <HeroTextWrapper>
         <Text3>📸대원들의 인증샷</Text3>
       </HeroTextWrapper>
 
       {/* 인증샷 없으면 */}
       <HeroTextWrapper>
         <NoHeroText1>앗!</NoHeroText1>
         <NoHeroText2>아직 인증한 대원이 없어요😥</NoHeroText2>
       </HeroTextWrapper>
       {/* 인증샷 있으면 */}
       <CertifyFeed>
         <ImageList sx={{ width: 350 }} cols={3} rowHeight={130}>
           {itemData.map((item) => (
             <ImageListItem key={item.img}>
               <img
                 src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                 srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                 alt={item.title}
                 loading="lazy"
               />
             </ImageListItem>
           ))}
         </ImageList>
       </CertifyFeed>
     </>
       }
</ParentsDiv>
  )
}