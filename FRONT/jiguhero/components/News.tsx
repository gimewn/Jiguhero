import NewsItem from 'components/NewsItem';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import getNews from 'pages/api/main/news';

export default function News(){
    
    const {data:missionItem} = useQuery(['news'], getNews)
    return(
        <>
        {missionItem?.map((item) => (<NewsItem key={item.promotionId} title={item.title} category={item.category} content={item.content} />))}
        </>
    )
}

export async function getServerSideProps(context) {
    const news2 = new QueryClient()
    const session = await getSession(context);
    await news2.prefetchQuery(['news'], ()=>{getNews()})
  
      return {
        props: {
          data: {
            session,
            dehydratedState: dehydrate(news2)
          },
        },
      };   
  }
