import Head from 'next/head';
import styled from 'styled-components';
import Backcomponents from 'components/back';


const BackCompo = styled(Backcomponents)`
  margin-top: 10px;
  margin-bottom: 10px;
`
const Block = styled('div')`
  
`

const ImgWrapper = styled('div')`
  margin-top: 30px;
  position: relative;
  width: 200px;
  height: 200px;
  
//추가할 것 : 모바일 환경 적용하자
  img{
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
`

const TitleWrapper = styled('div')`
`

const DateWrapper = styled('div')`
`

const PersonWrapper = styled('div')`
`
const Content = styled('div')`
  display: flex;
  flex-direction: column;
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
interface MissionProps {
  missionId: number,
  title: string,
  startDate: number,
  endDate: number,
  nowPerson: number,
  maxPerson: number,
  image: string,
}


function MissionList({ missionId, image, title, startDate, endDate, nowPerson, maxPerson }: MissionProps) {
  return (
    <>
      <ImgWrapper>
        <img src={image} />
      </ImgWrapper>

      <TitleWrapper>
        <a>{title}</a>
      </TitleWrapper>

      <PersonWrapper>
        <a>{nowPerson} / {maxPerson}명</a>
      </PersonWrapper>

      <DateWrapper>
        <a>{startDate} ~ {endDate}</a>
      </DateWrapper>
    </>
  )
}




export default function Detail() {
  const MISSION = [
    {
      missionId: 1,
      title: "일주일 동안 커피  텀블러에 받기",
      startDate: 20220805,
      endDate: 20220819,
      nowPerson: 17,
      maxPerson: 60,
      image: 'https://cdn.pixabay.com/photo/2019/11/02/20/50/coffee-4597416_960_720.jpg'
    }
  ]
  return (
    <>
      {/* 헤더 */}
      <Head>
        <title>임무상세 | 지구-방위대</title>
      </Head>

      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <BackCompo name='임무 상세보기'></BackCompo>

      <Block>
        <Content>

          {MISSION.map((item, index) => (
            <MissionList key={index} {...item} />
          ))}
        </Content>
      </Block>


    </>
  )
}
