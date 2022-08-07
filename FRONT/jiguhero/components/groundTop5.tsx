import { useRouter } from 'next/router';
import styled from 'styled-components';

const Ground = styled('div')`
    border-radius: 20px;
    border: solid 1px #65ACE2;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:100%;
    /* min-width:100px; */
    height:120px;
    padding:10px;
    margin-right:20px;
`
const Icon = styled('p')`
    font-size:20px;
    margin: 5px auto;
`
const Title = styled('p')`
    margin: 0 auto;
    text-align: center;
    font-size:13px;
    width:80px;
    word-break: keep-all;
`

interface GroundFiveProps{
    icon:string,
    title:string,
    id:number,
}

export default function GroundFive({icon, title, id}:GroundFiveProps){
    const router = useRouter();
    return(
        <Ground onClick={() => {router.push(`ground/${id}`)}}>
            <Icon>{icon}</Icon>
            <Title>{title}</Title>
        </Ground>
    )
}