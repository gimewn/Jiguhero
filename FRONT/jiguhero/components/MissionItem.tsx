import { useRouter } from 'next/router';
import styled from 'styled-components';

const Title = styled('p')`
    font-weight: bold;
    font-size:1em;
    margin: 5px 10px;
`
const JoinSentence = styled('span')`
    font-size:13px;
    margin: 0 2px;
`
const JoinPeople = styled('span')`
    font-weight:bold;
    font-size:15px;
    color:#65ACE2;
`
const Mission = styled('div')`
    border: #98C064 1px solid;
    border-radius: 20px;
    padding:10px;
    display:flex;
    margin: 10px 0;
    justify-content: center;
    flex-direction: column;
    align-items: center;
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

interface MissionItemProps{
    title:string,
    now:number,
    id:number,
}

export default function MissionItem({title, now, id}:MissionItemProps){
    const router = useRouter();
    return(
        <Mission onClick={() => {router.push(`mission/${id}`)}}>
            <Title>{title}</Title>
            <div>
            <JoinSentence> 현재 </JoinSentence>
            <JoinPeople>{now}</JoinPeople>
            <JoinSentence> 명의 대원이 참여 중이에요!</JoinSentence>
            </div>
        </Mission>
    )
}