import MissionItem from 'components/MissionItem';
import styled from 'styled-components';
import getMission from 'pages/api/main/mission';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";

const MissionItems = styled('div')`
`

export default function Mission3(){
    
    const {data:missionData} = useQuery(['mission'], getMission)

    return(
        <MissionItems>
        {missionData?.map((item) => (<MissionItem title={item.title} now={item.nowPerson} key={item.missionId} id={item.missionId}/>))}
        </MissionItems>
    )
}

export async function getServerSideProps(context) {
  const mission2 = new QueryClient()
  const session = await getSession(context);
  await mission2.prefetchQuery(['mission'], ()=>{getMission()})

    return {
      props: {
        data: {
          session,
          dehydratedState: dehydrate(mission2)
        },
      },
    };
  
}