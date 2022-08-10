import Head from 'next/head';
import styled from 'styled-components';
import Backcomponents from 'components/back';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import missionUserData from 'pages/api/mission/[id]';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { ButtonFull, ButtonBorder } from 'styles/styled';
import { useRouter } from 'next/router';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Mission from '.';

const BackCompo = styled(Backcomponents)`
  margin-top: 10px;
  margin-bottom: 10px;
`

const Block = styled('div')`
  margin: 0.2rem;

`
const Content = styled('div')`
  display:flex;
  justify-content: left;
  
    @media screen and (min-width: 360px){
        margin-left: 1.5rem;
    }
    @media screen and (min-width: 500px){
        margin-left: 1.5rem;
    }
    @media screen and (min-width:700px){
        margin-left: 3.5rem;
    }
`
const ImageBlock = styled('div')`
    display:flex;
  flex-direction: row;
  justify-content: center;
    @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 500px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    }
`
const ImageContent = styled('div')`
    margin-top: 10px;
  display: flex;
  flex-direction: column;
  //임시 이미지를
  background-image: url('https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_960_720.jpg');
  background-size: cover;
  background-position: center;
  height: 300px;
  border-radius: 10px;
    @media screen and (min-width: 360px){
        width:360px;
        height:360px;
    }
    @media screen and (min-width: 500px){
        width:500px;
        height:500px;
    }
    @media screen and (min-width:700px){
        width:500px;
        height: 500px;
    }
`

const PeopleIcon = styled(EmojiPeopleRoundedIcon)`
    color: #65ACE2;
    margin-right: 5px;
    margin-left: 5px;
`
const PointIcon = styled(MonetizationOnRoundedIcon)`
    color: #65ACE2;
    margin-right: 5px;
    margin-left: 5px;
`
const CalendarIcon = styled(CalendarMonthRoundedIcon)`
    color: #65ACE2;
    margin-right: 5px;
    margin-left: 5px;
`
const TitleText = styled('a')`
    font-size: x-large;
    font-weight: bold;
`
const ContentText = styled('a')`
    font-size: medium;
`
const LocalIcon = styled(RoomRoundedIcon)`
    color: #65ACE2;
    margin-right: 5px;
    margin-left: 5px;
`
const WebBtn = styled(ButtonFull)`

  border-radius: 12.5px;
  padding:5px;
  color: white;
  font-size: x-small;
  margin: 3px;

`
const BtnContent = styled('div')`
    display:flex;
    justify-content: flex-end;
    @media only screen and (max-width:650px){
        display: none;
    }
    @media screen and (min-width:700px){
        margin-right: 3.5rem;
    }
`


export default function MissionDetail() {
    const router = useRouter()
    const { data: MissionDetail } = useQuery(['missions'], missionUserData)
    console.log(MissionDetail)
    return (
        <>
            {/* 헤더 */}
            <Head>
                <title>임무상세 | 지구-방위대</title>
            </Head>

            {/* 모바일 뷰에서 뒤로가기 버튼! */}
            <BackCompo name='임무 상세보기'></BackCompo>


            {/* 미션이미지 */}
            <Block>
                <ImageBlock>
                    <ImageContent />
                </ImageBlock>
            </Block>

            {/* 임무타이틀 */}
            <Block>
                <Content>
                    <TitleText>{MissionDetail.title}</TitleText>
                </Content>
            </Block>

            {/* 참여자수/정원 */}
            <Block>
                <Content>
                    < PeopleIcon />
                    <ContentText>{MissionDetail.nowPerson} / {MissionDetail.maxPerson} 명</ContentText>
                </Content>
            </Block>

            {/* 포인트 */}
            <Block>
                <Content>
                    <PointIcon />
                    <ContentText>+{MissionDetail.entryPoint}P</ContentText>
                </Content>
            </Block>

            {/* 활동기간 */}
            <Block>
                <Content>
                    <CalendarIcon />
                    <ContentText>
                        {MissionDetail.startDate[0]}.{MissionDetail.startDate[1]}.{MissionDetail.startDate[2]}
                        ~ {MissionDetail.endDate[0]}.{MissionDetail.endDate[1]}.{MissionDetail.endDate[2]}
                    </ContentText>
                </Content>
            </Block>

            {/* 미션장소 */}
            <Block>
                <Content>
                    <LocalIcon />
                    <ContentText>
                        {MissionDetail.sidoCode} {MissionDetail.gugunCode}
                    </ContentText>
                </Content>
            </Block>


            {/* 웹 뷰에서 수정 삭제 버튼 */}
            <Block>
                <BtnContent>
                    <WebBtn
                        dColor={"#98C064"}
                        hColor={"#65ACE2"}
                        onClick={() => router.push("/mission/createmission")}
                    >수정</WebBtn>

                    <WebBtn
                        hColor={"#98C064"}
                        dColor={"#65ACE2"}
                        onClick={() => router.push("/mission/createmission")}
                    >삭제</WebBtn>
                </BtnContent>
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