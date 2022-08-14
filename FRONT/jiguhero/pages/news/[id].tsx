import Backcomponents from 'components/back';
import Head from 'next/head';
import styled from 'styled-components';
import { ParentsDiv } from 'styles/styled'
import getPromotion from 'pages/api/news/[id]';
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const H2 = styled('h2')`
    margin-left:20px;
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
    margin-top: 10px;
    font-size: medium;
    @media screen and (min-width: 650px) {
    font-size: x-large;
    }
`

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
                <NewsImg className='newsimage' src='https://cdn.pixabay.com/photo/2016/11/18/07/45/mark-1833559_960_720.jpg' />
                <NewsContent>안녕하세요</NewsContent>
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