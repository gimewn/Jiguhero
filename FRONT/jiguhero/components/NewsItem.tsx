import styled from 'styled-components';

interface NewsProps{
    id:number,
    category:string,
    image:string,
    title:string
}

const NewsDiv = styled('div')`
    background: url('${(props) => props.image}') no-repeat center;
    background-size: cover;
    position:relative;
    height: 150px;
    margin: 10px 0;
    border:0;
    border-radius: 10px;
    :hover{
        background:#252525;
        .newsTitle{
            opacity: 1;
        }
    }
`

const Title = styled('div')`
    background-color: #252525;
    opacity: 0;
    font-size:18px;
    color:white;
    position: absolute;
    left:20px;
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
    background-color:#98C064;
    color:white;
    padding: 10px;
    border: 0px;
    border-radius: 10px;
    position: relative;
    display:inline-block;
    top:80px;
    margin-right:10px;
`

export default function NewsItem({id, category, image, title}:NewsProps){
    return(
        <NewsDiv image = {image}>
        <Title className="newsTitle">
            <p>{title}</p></Title>
        <Item>
            <Category>#{category}</Category>
        </Item>
        </NewsDiv>
    )
}