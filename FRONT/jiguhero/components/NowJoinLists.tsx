import MissionList from 'components/MissionList';
import { Pagination } from "@mui/material";
import { nowjoinlist } from "states/mission";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from 'styled-components';
import JoinMission from 'pages/api/mission/joinMission';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";


const PagI = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

interface IPage {
  page: number;
  count: number;
}

export default function NowJoinLists() {
  const { data: MISSION } = useQuery(['missions'], JoinMission)
  console.log(MISSION)
  const remainder = MISSION?.length % 5;
  const quot = parseInt(MISSION?.length / 5);
  const page = useRecoilValue(nowjoinlist)
  const setPage = useSetRecoilState(nowjoinlist)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {MISSION?.slice((page - 1) * 5, page * 5).map((item, index) => (
        <MissionList
          key={index} {...item} />
      ))}
      <PagI
        count={remainder === 0 ? quot : quot + 1}
        page={page}
        onChange={handleChange}
      />
    </>
  )
}

export async function getServerSideProps(context) {
  const missionList = new QueryClient()
  const session = await getSession(context);
  await missionList.prefetchQuery(['missions'], () => { JoinMission() })

  return {
    props: {
      data: {
        session,
        dehydratedState: dehydrate(missionList)
      },
    },
  };

}