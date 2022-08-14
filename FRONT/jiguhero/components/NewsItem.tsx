import { useRouter } from 'next/router';
import styled from 'styled-components';

interface NewsProps{
    category:number,
    title:string,
    content:string,
    key:number
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

export default function NewsItem(props:NewsProps){
    const router = useRouter();
    return(
        <NewsDiv onClick={() => {router.push(`news/${props.key}`)}}>
        <Title>
            <p className="newsTitle">{props.title}</p>
            <p className="newsContent">{props.content}</p>
            </Title>
            
        <Item>
            { props.category === 1 ? <Category className="category">#프로모션</Category> : <Category className="category">#뉴스</Category>}
        </Item>
        </NewsDiv>
    )
}