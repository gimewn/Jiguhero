import Backcomponents from 'components/back';
import Head from 'next/head';
import styled from 'styled-components';
import { ParentsDiv } from 'styles/styled'
import { ButtonFull, ButtonBorder } from "styles/styled";
import getPromotion from 'pages/api/news/[id]';
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const H2 = styled('h2')`
  @media only screen and (max-width: 650px) {
    display:none;
  }
`
const NewsTop = styled('div')`
    @media screen and (min-width: 650px){
        margin-left:35px;
        margin-right: 35px;
    }
    @media screen and (max-width: 650px) {
        margin-top:20px;
        
    }
`
const NewsImg = styled('img')`
    
`
const NewsContent = styled('div')`
    border-radius: 10px;
    border: 1px solid #65ACE2;
    margin-top: 10px;
    font-size: medium;
    @media screen and (min-width: 650px) {
    font-size: x-large;
    }
`

const ModBtn = styled(ButtonFull)`
  border-radius: 12.5px;
  padding: 5px;
  color: white;
  font-size: x-small;
  margin: 3px;
`
const DelBtn = styled(ButtonFull)`
  border-radius: 12.5px;
  padding: 5px;
  color: white;
  font-size: x-small;
  margin: 3px;
`
const BtnContent = styled("div")`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  @media screen and (min-width: 700px) {
    /* margin-right: 3.5rem; */
  }
`;
export default function NewsDetail() {
  return (
    <ParentsDiv>
      {/* 헤더 */}
      <Head>
        <title>지구-방위대 소식 | 지구-방위대</title>
      </Head>
      {/* 방위대 소식 back버튼 */}
      <Backcomponents name='지구-방위대 소식'></Backcomponents>
      <NewsTop>
        <H2>🦸🏻 지구-방위대 소식</H2>
        {/* 이미지 및 내용 api 연동 필요 */}
        <NewsImg className='newsimage' src='https://cdn.pixabay.com/photo/2016/11/18/07/45/mark-1833559_960_720.jpg' />
        <NewsContent>안녕하세요안녕하세요안뇽하세요안녕하세여안녕하세요</NewsContent>

        <BtnContent>
          {/* 관리자일 때만 보이게....수정 삭제 api 연동 필요 */}
          <ModBtn
            hColor={'#98C064'} dColor={'#65ACE2'}>
            수정</ModBtn>
          <DelBtn
            dColor={'#98C064'} hColor={'#65ACE2'}>
            삭제</DelBtn>
        </BtnContent>
      </NewsTop>


    </ParentsDiv>
  )
}

// export async function getServerSideProps(context) {
//     const promotionDetail = new QueryClient()
//     const session = await getSession(context);
//     await promotionDetail.prefetchQuery(['promotions'], () => { getPromotion(context) })

//     return {
//         props: {
//             data: {
//                 session,
//                 dehydratedState: dehydrate(promotionDetail)
//             },
//         },
//     }
// }