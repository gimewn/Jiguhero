import styled from 'styled-components';

interface NewsProps{
    id:number,
    category:string,
    image:string,
    title:string
}

const NewsDiv = styled('div')`
    position:relative;
`

const Title = styled('p')`
    visibility: hidden;
    color:white;
    position: absolute;
`

const Item = styled('div')`
    background: url('${(props) => props.image}') no-repeat center;
    background-color: #252525;
    background-size: cover;
    height: 150px;
    margin: 10px 0;
    border:0;
    border-radius: 10px;
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
    :hover{
        filter: brightness(30%);
    }
    &:hover .newsTitle{
        visibility: visible;
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
    top:45px;
    margin-right:10px;
`

export default function NewsItem({id, category, image, title}:NewsProps){
    return(
        <NewsDiv>
        <Title className="newsTitle">{title}</Title>
        <Item image = {image}>
            <Category>#{category}</Category>
        </Item>
        </NewsDiv>
    )
}