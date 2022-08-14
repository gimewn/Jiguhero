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
    key: number,
    proId: number,
    idx: number,
}

const NewsDiv1 = styled('div')`
    position:relative;
    height: 150px;
    margin: 10px 0;
    border:1px solid #98C064;
    border-radius: 20px;
    :hover{
        background:#98C064;
        .newsTitle{
            color:white;
        }
        .newsContent{
            color:white;
        }
        .category{
            background-color: white;
            color:#98C064;
        }
    }
`

const NewsDiv2 = styled('div')`
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

const Title1 = styled('div')`
    .newsTitle{
        font-size:20px;
        font-weight:bold;
        color:#98C064;
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
const Title2 = styled('div')`
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

const Category1 = styled('p')`
    background-color:#98C064;
    color:white;
    padding: 10px;
    border: 0px;
    border-radius: 10px;
    position: relative;
    display:inline-block;
    top:75px;
    right:1px;
    margin: 15px;
`
const Category2 = styled('p')`
    background-color:#65ACE2;
    color:white;
    padding: 10px;
    border: 0px;
    border-radius: 10px;
    position: relative;
    display:inline-block;
    top:75px;
    right:1px;
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
                <TextN onClick={() => { setTab(true) }}>뉴스</TextN>
                <TextP onClick={() => { setTab(false) }}>프로모션</TextP>
                <NewBtn dColor={'#65ACE2'} hColor={'#98C064'}>새소식 등록하기</NewBtn>
            </TabRow>
            <HR />
            {tab ? <NewsLists /> : <PromotionLists />}
        </>
    )
}


//뉴스 탭
function NewsLists() {
    const { data: promotion } = useQuery(['promotions'], getNews)
    console.log(promotion)

    return (
        <TabDiv>
            {promotion?.filter((item) => item.category === 2).map((item, index) => (<NewsList key={index} idx={index} proId={item.promotionId} title={item.title} category={item.category} content={item.content} />))}
        </TabDiv>
    )
}

function NewsList(props: NewsProps) {
    const router = useRouter();
    console.log(props.idx)
    return (
        <>
            {props.idx / 2 === 0 ?
                <NewsDiv1 onClick={() => { router.push(`news/${props.proId}`) }}>
                    <Title1>
                        <p className="newsTitle">{props.title}</p>
                        <p className="newsContent">{props.content}</p>
                    </Title1>

                    <Item>
                        {props.category === 1 ? <Category1 className="category">#프로모션</Category1> : <Category1 className="category">#뉴스</Category1>}
                    </Item>
                </NewsDiv1>
                :
                <NewsDiv2 onClick={() => { router.push(`news/${props.proId}`) }}>
                    <Title2>
                        <p className="newsTitle">{props.title}</p>
                        <p className="newsContent">{props.content}</p>
                    </Title2>

                    <Item>
                        {props.category === 1 ? <Category2 className="category">#프로모션</Category2> : <Category2 className="category">#뉴스</Category2>}
                    </Item>
                </NewsDiv2>
            }
        </>
    )
}

//프로모션 탭
function PromotionLists() {
    const { data: promotion } = useQuery(['promotions'], getNews)
    console.log(promotion)

    return (
        <TabDiv>
            {promotion?.filter(item => item.category === 1).map((item, index) => (<PromotionList key={index} idx={index} proId={item.promotionId} title={item.title} category={item.category} content={item.content} />))}
        </TabDiv>
    )
}

function PromotionList(props: NewsProps) {
    const router = useRouter();
    console.log(props.idx)
    return (
        <>
            {props.idx / 2 === 0 ?
                <NewsDiv1 onClick={() => { router.push(`news/${props.proId}`) }}>
                    <Title1>
                        <p className="newsTitle">{props.title}</p>
                        <p className="newsContent">{props.content}</p>
                    </Title1>

                    <Item>
                        {props.category === 1 ? <Category1 className="category">#프로모션</Category1> : <Category1 className="category">#뉴스</Category1>}
                    </Item>
                </NewsDiv1>
                :
                <NewsDiv2 onClick={() => { router.push(`news/${props.proId}`) }}>
                    <Title2>
                        <p className="newsTitle">{props.title}</p>
                        <p className="newsContent">{props.content}</p>
                    </Title2>

                    <Item>
                        {props.category === 1 ? <Category2 className="category">#프로모션</Category2> : <Category2 className="category">#뉴스</Category2>}
                    </Item>
                </NewsDiv2>
            }
        </>
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