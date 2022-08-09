import Head from 'next/head';
import styled from 'styled-components';
import Backcomponents from 'components/back';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import missionUserData from 'pages/api/mission/[id]';

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


// function MissionList({ missionId, image, title, startDate, endDate, nowPerson, maxPerson }: MissionProps) {
function MissionList() {
    return (
        <>
            <ImgWrapper>

            </ImgWrapper>

            <TitleWrapper>
                <a>임무타이틀</a>
            </TitleWrapper>

            <PersonWrapper>
                <a>1 / 2명</a>
            </PersonWrapper>

            <DateWrapper>
                <a>1 ~ 2</a>
            </DateWrapper>
        </>
    )
}




export default function MissionDetail() {
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
                    <MissionList />
                    {/* {MissionData?.map((item, index) => (
                        <MissionList key={index} {...item} />
                    ))} */}
                </Content>
            </Block>


        </>
    )
}



export async function getServerSideProps(context) {
    const missiondetail = new QueryClient()
    const session = await getSession(context);
    await missiondetail.prefetchQuery(['mission'], () => { missionUserData() })

    return {
        props: {
            data: {
                session,
                dehydratedState: dehydrate(missiondetail)
            },
        },
    };

}