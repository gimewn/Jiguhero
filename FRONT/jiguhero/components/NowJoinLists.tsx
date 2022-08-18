import NowJoinList from 'components/NowJoinList';
import { nowjoinlist } from "states/mission";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from 'styled-components';
import JoinMission from 'pages/api/mission/joinMission';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import Pagination from 'components/pagination';
import { useEffect, useState } from 'react';



export default function NowJoinLists() {

  // const { data: MISSION } = useQuery(['missions'], JoinMission)
  // console.log(MISSION)
  // const [page, setPage] = useState(1);
  // const handlePageChange = (page) => {
  //   setPage(page)
  //   console.log(page)
  // }
  // const count = MISSION?.length
  // useEffect(() => {
  //   console.log(count)
  // }, [count])

  const JoinMissionList = 
    <>
      {/* {MISSION?.map((item, index) => (
        <NowJoinList key={index} {...item} />))}
      <Pagination page={page} totalcount={count} setPage={handlePageChange} /> */}
    </>
  return JoinMissionList
}


// export async function getServerSideProps(context) {
//   const joinList = new QueryClient()
//   const session = await getSession(context);
//   await joinList.prefetchQuery(['missions'], () => { JoinMission() })

//   return {
//     props: {
//       data: {
//         session,
//         dehydratedState: dehydrate(joinList)
//       },
//     },
//   };

// }