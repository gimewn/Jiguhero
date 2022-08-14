import React, { useState } from 'react';
import { ParentsDiv } from 'styles/styled'
import { ButtonFull, ButtonBorder } from 'styles/styled';
import Backcomponents from 'components/back';
import Head from 'next/head';
import styled from 'styled-components';
import getNews from 'pages/api/main/news';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import Pagination from 'components/pagination';
import { useRouter } from 'next/router';
import { NewsTabPage } from "states/news";
import { RecoilState, useRecoilValue, useSetRecoilState } from "recoil";


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
    margin: 0px 10px 0px 0px ;
    :hover{
        cursor: pointer;
    }
`
const TextN = styled('p')`
    margin: 0px 10px 0px 0px ;
    :hover{
        cursor: pointer;
    }
`

const NewBtn = styled(ButtonFull)`
    font-size: small;
    border-radius: 10px;
    padding: 3px 10px;
    margin-left: auto;
    margin-right: 0px;
`
const HR = styled('hr')`
    color: #98c064;
    border: 0.5px dotted;
    @media only screen and (min-width: 650px) {
    margin-left:35px;
  }
`

const TabDiv = styled('div')`
    @media only screen and (min-width: 650px) {
    margin-left:35px;
  }
`
// list
interface NewsProps {
    category: number,
    title: string,
    content: string,
    key: number
}

const NewsDiv = styled('div')`
    position:relative;
    height: 150px;
    margin: 10px 0;
    border:1px solid #65ACE2;
    border-radius: 20px;
    :hover{
        background:#65ACE2;
        .newsTitle{
            color:white;
        }
        .newsContent{
            color:white;
        }
        .category{
            background-color: white;
            color:#65ACE2;
        }
    }
`

const Title = styled('div')`
    .newsTitle{
        font-size:20px;
        font-weight:bold;
        color:#65ACE2;
        margin-bottom: 10px;
    }
    .newsContent{
        font-size: 16px;
        margin: 5px auto;
        color:#252525;
    }
    position: absolute;
    left:25px;
`

const Item = styled('div')`
    display:flex;
    justify-content: flex-end;
    align-items: flex-end;
    @media screen and (min-width: 375px){
        width:300px;
    }
    @media screen and (min-width:450px){
        width: 400px;
    }
    @media screen and (min-width: 550px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    }
`

const Category = styled('p')`
    background-color:#65ACE2;
    color:white;
    padding: 10px;
    border: 0px;
    border-radius: 10px;
    position: relative;
    display:inline-block;
    top:75px;
    margin: 15px;
`
//헤더! (새소식 등록하기 버튼, 탭전환...)
function HeaderTab() {
    // 탭 전환
    const tab = useRecoilValue(NewsTabPage);
    const setTab = useSetRecoilState(NewsTabPage);

    return (
        <>
            <TabRow>
                <TextN>뉴스</TextN>
                <TextP>프로모션</TextP>
                <NewBtn dColor={'#65ACE2'} hColor={'#98C064'}>새소식 등록하기</NewBtn>
            </TabRow>
            <HR />
        </>
    )
}


//뉴스 탭
function NewsLists() {

}

//프로모션 탭
function PromotionLists() {
    const { data: promotion } = useQuery(['promotions'], getNews)
    console.log(promotion)

    return (
        <TabDiv>


            {promotion?.map((item) => (<PromotionList key={item.promotionId} title={item.title} category={item.category} content={item.content} />))}
        </TabDiv>
    )
}

function PromotionList(props: NewsProps) {
    const router = useRouter();
    return (
        <NewsDiv onClick={() => { router.push(`news/${props.key}`) }}>
            <Title>
                <p className="newsTitle">{props.title}</p>
                <p className="newsContent">{props.content}</p>
            </Title>

            <Item>
                {props.category === 1 ? <Category className="category">#프로모션</Category> : <Category className="category">#뉴스</Category>}
            </Item>
        </NewsDiv>
    )
}


export default function News() {
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
            <HeaderTab />
            <PromotionLists />


        </ParentsDiv>
    )
}


export async function getServerSideProps(context) {
    const promotionList = new QueryClient()
    const session = await getSession(context);
    await promotionList.prefetchQuery(['promotions'], () => { getNews() })

    return {
        props: {
            data: {
                session,
                dehydratedState: dehydrate(promotionList)
            },
        },
    }
}