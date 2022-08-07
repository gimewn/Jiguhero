import MissionItem from 'components/MissionItem';
import styled from 'styled-components';
import {useQuery} from '@tanstack/react-query';
import {Token, BASE_URL} from 'pages/api/fetch';

const MissionItems = styled('div')`
`

export default function Mission3(){
    const getMission = async() => {
        return (await fetch(BASE_URL+'home/mission', {
            method:'get',
            headers:{
                Authorization : Token
            }
        })).json()
    }
    const {data} = useQuery(['mission'], getMission)

    return(
        <MissionItems>
        {data?.map((item) => (<MissionItem title={item.title} now={item.nowPerson} key={item.missionId} id={item.missionId}/>))}
        </MissionItems>
    )
}