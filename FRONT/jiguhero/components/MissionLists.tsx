import MissionList from 'components/MissionList';
import { missionLists } from "states/mission";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from 'styled-components';
import getMission from 'pages/api/mission/index';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
<<<<<<< HEAD
import PropTypes from 'prop-types';
import searchMission from 'pages/api/mission/searchMission';
=======
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Pagination from 'components/pagination';
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a




<<<<<<< HEAD

export default  function MissionLists({selector}) {
  
  const { data: Missions, isLoading } = useQuery<string[]>(['missions'],  ()=>{ return searchMission('', 'time')} )

  const remainder = Missions.length % 5;
  const MissionLen = `${Missions.length / 5}`
  const quot = parseInt(MissionLen)
  const page = useRecoilValue(missionLists)
  const setPage = useSetRecoilState(missionLists)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };



  return (
    <>
      {Missions.slice((page - 1) * 5, page * 5).map((item, index) => (
        <MissionList
          key={index} {...item} />
      ))}
      <PagI
        count={remainder === 0 ? quot : quot + 1}
        page={page}
        onChange={handleChange}
      />
=======
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

  const AllMissionList = count !== undefined && (
    <>
      {MISSION?.map((item, index) => (
        <MissionList key={index} {...item} />))}
      <Pagination page={page} totalcount={count} setPage={handlePageChange} />
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
    </>
  )
  return AllMissionList
}
//   return (
//     <>
//       {MISSION?.map((item, index) => (
//         <MissionList key={index} {...item} />))}
//     </>
//   )
// }

// export async function getServerSideProps(context) {
//   const missionList = new QueryClient()
  
//   await missionList.prefetchQuery(['missions'], () => { getMission("latest") })

<<<<<<< HEAD
//   return {
//     props: {
//       data: {
    
//         dehydratedState: dehydrate(missionList)
//       },
//     },
//   };
// }
=======
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
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
