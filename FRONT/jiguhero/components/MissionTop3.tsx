import MissionItem from 'components/MissionItem';
import styled from 'styled-components';

const MissionItems = styled('div')`
`

const MissionTopThree = [
    {
        title: "일주일 동안 커피  텀블러에 받기",
        now: 348,
        limit:500
    },
    {
        title: "미라클모닝과 플로깅을 함께 🌼",
        now: 270,
        limit:500
    },
    {
        title: "샴푸바 사용해보기",
        now: 10,
        limit:300
    }
  ];

export default function Mission3(){
    return(
        <MissionItems>
        {MissionTopThree.map((item) => (<MissionItem title={item.title} now={item.now} limit={item.limit} key={item.title} />))}
        </MissionItems>
    )
}