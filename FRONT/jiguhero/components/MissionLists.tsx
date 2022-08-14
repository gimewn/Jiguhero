import MissionList from 'components/MissionList';
import { missionLists } from "states/mission";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from 'styled-components';
import getMission from 'pages/api/mission/index';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Pagination from 'components/pagination';




export default function MissionLists() {

  const { data: MISSION } = useQuery(['missions'], getMission)
  console.log(MISSION)
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page)
    console.log(page)
  }
  const count: number = MISSION?.length
  useEffect(() => {
    console.log(count)
  }, [count])

  const AllMissionList = count && (
    <>
      {MISSION?.map((item, index) => (
        <MissionList key={index} {...item} />))}
      <Pagination page={page} totalcount={count} setPage={handlePageChange} />
    </>
  )
  return AllMissionList
}


export async function getServerSideProps(context) {
  const missionList = new QueryClient()
  const session = await getSession(context);
  await missionList.prefetchQuery(['missions'], () => { getMission() })

  return {
    props: {
      data: {
        session,
        dehydratedState: dehydrate(missionList)
      },
    },
  }
}