import React, { useState } from 'react';
import { ParentsDiv } from 'styles/styled'
import { ButtonFull, ButtonBorder } from 'styles/styled';
import Backcomponents from 'components/back';
import Head from 'next/head';
import styled from 'styled-components';
import getNews from 'pages/api/news/index';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import Pagination from 'components/pagination';
import { useRouter } from 'next/router';
import { NewsTabPage } from "states/news";
import { RecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ProLists from "components/PromotionLists";
import NewsLists from "components/NewsLists";

const H2 = styled('h2')`
  @media only screen and (max-width: 650px) {
    display:none;
  }
`
const NewsTop = styled('div')`
    margin-left:35px;
    @media only screen and (max-width: 650px) {
        margin-top:20px;
    }
`
const TabRow = styled('div')`
    display: flex;
    flex-direction: row;
    @media only screen and (min-width: 650px) {
    margin-left:35px;
  }
`
const TextP = styled('p')`
    font-weight: bold;
    margin: 0px 10px 0px 0px ;
    :hover{
        cursor: pointer;
    }
`
const TextPb = styled(TextP)`
    color: #65ACE2;
`
const TextN = styled('p')`
    margin: 0px 10px 0px 0px ;
        font-weight: bold;
    :hover{
        cursor: pointer;
    }
`
const TextNb = styled(TextN)`
    color: #98c064;
`
const NewBtn = styled(ButtonFull)`
    font-size: small;
    border-radius: 10px;
    padding: 3px 10px;
    margin-left: auto;
    margin-right: 0px;
`
const HR = styled('hr')`
    color: #ffffff;
    border: 0.5px dotted;
    @media only screen and (min-width: 650px) {
    margin-left:35px;
  }
`

export default function News() {
    const router = useRouter()
    // 탭 전환
    const tab = useRecoilValue(NewsTabPage);
    const setTab = useSetRecoilState(NewsTabPage);
    return (
        <ParentsDiv>
            {/* 헤더 */}
            <Head>
                <title>지구-방위대 소식 | 지구-방위대</title>
            </Head>
            {/* 방위대 소식 back버튼 */}
            <Backcomponents name='지구 - 방위대 소식'></Backcomponents>

            <NewsTop>
                <H2>🦸🏻 지구 - 방위대 소식</H2>
            </NewsTop>
            <TabRow>
                {tab ?
                    <TextNb onClick={() => { setTab(true) }}>뉴스</TextNb> : <TextN onClick={() => { setTab(true) }}>뉴스</TextN>}
                {tab ? <TextP onClick={() => { setTab(false) }}>프로모션</TextP> :
                    <TextPb onClick={() => { setTab(false) }}>프로모션</TextPb>}
                {/* 새소식 등록 연결 필요 */}
                {tab ? <NewBtn hColor={'#65ACE2'} dColor={'#98C064'} onClick={() => router.push('news/createnews')} >새소식 등록하기</NewBtn>
                    : <NewBtn dColor={'#65ACE2'} hColor={'#98C064'} onClick={() => router.push('news/createnews')}>새소식 등록하기</NewBtn>}
            </TabRow>
            {tab ? <HR color='#98C064' /> : <HR color='#65ACE2' />}

            {tab ? <NewsLists /> : <ProLists />}
        </ParentsDiv>
    )
}


// export async function getServerSideProps(context) {
//     const promotionList = new QueryClient()
//     const session = await getSession(context);
//     await promotionList.prefetchQuery(['promotions'], () => { getNews() })

//     return {
//         props: {
//             data: {
//                 session,
//                 dehydratedState: dehydrate(promotionList)
//             },
//         },
//     }
// }