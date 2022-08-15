import styled from 'styled-components';
import getNews from 'pages/api/news/index';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { useRouter } from 'next/router';


// list
interface NewsProps {
  category: number,
  title: string,
  content: string,
  key: number,
  proId: number,
  idx: number,
}

const NewsDiv = styled('div')`
    position:relative;
    height: 150px;
    margin: 15px 0;
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

const NewsDiv2 = styled(NewsDiv)`
    border:1px solid #65ACE2;
    :hover{
        background:#65ACE2;
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
const Title2 = styled(Title1)`
    .newsTitle{
        color:#65ACE2;
    }
`
const Item = styled('div')`
    display:flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
`

const Category1 = styled('p')`
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
const Category2 = styled(Category1)`
    background-color:#65ACE2;
`




export default function PromotionList(props: NewsProps) {
  const router = useRouter();
  // console.log(props.idx)
  return (
    <>
      <NewsDiv onClick={() => { router.push(`news/${props.proId}`) }}>
        <Title1>
          <p className="newsTitle">{props.title}</p>
          <p className="newsContent">{props.content}</p>
        </Title1>

        <Item>
          {props.category === 1 ? <Category1 className="category">#프로모션</Category1> : <Category1 className="category">#뉴스</Category1>}
        </Item>
      </NewsDiv>
    </>
  )
}
