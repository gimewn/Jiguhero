import styled from 'styled-components';

const Ground = styled('div')`
    border-radius: 20px;
    border: solid 1px #65ACE2;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:120px;
    height:120px;
    padding:10px;
`
const Icon = styled('p')`
    font-size:20px;
    margin:0 auto;
`
const Title = styled('p')`
    margin: 0 auto;
    text-align: center;
    font-size:12px;
    width:60px;
    word-break: keep-all;
`

interface GroundFiveProps{
    icon:string,
    title:string
}

export default function GroundFive({icon, title}:GroundFiveProps){
    return(
        <Ground>
            <Icon>{icon}</Icon>
            <Title>{title}</Title>
        </Ground>
    )
}