import getNews from 'pages/api/news/index';
import styled from 'styled-components';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import NewsList from './NewsList';

const TabDiv = styled('div')`
    @media only screen and (min-width: 650px) {
    margin-left:35px;
  }
`
//뉴스 탭
export default function NewsLists() {
  const { data: promotion } = useQuery(['promotions'], getNews)
  console.log(promotion)

  return (
    <TabDiv>
      {promotion?.filter((item) => item.category === 2).map((item, index) => (<NewsList key={index} idx={index} proId={item.promotionId} title={item.title} category={item.category} content={item.content} />))}
    </TabDiv>
  )
}