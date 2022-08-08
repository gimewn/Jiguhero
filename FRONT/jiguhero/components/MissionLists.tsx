import MissionList from 'components/MissionList';
import { Pagination } from "@mui/material";
import { missionLists } from "states/mission";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from "next/link";

const MISSION = [
  {
    nickname: "니츠랜선이모",
    title: "일주일 동안 커피  텀블러에 받기",
    start_date: 20220805,
    end_date: 20220819,
    sido: "지역무관",
    now_person: 17,
    max_person: 60,
    image: 'https://cdn.pixabay.com/photo/2019/11/02/20/50/coffee-4597416_960_720.jpg'
  },
  {
    nickname: "니츠랜선이모",
    title: "일주일 동안 커피  텀블러에 받기",
    start_date: 20220805,
    end_date: 20220819,
    sido: "지역무관",
    now_person: 17,
    max_person: 60,
    image: 'https://cdn.pixabay.com/photo/2019/11/02/20/50/coffee-4597416_960_720.jpg'
  },

  {
    nickname: "니츠랜선이모",
    title: "일주일 동안 커피  텀블러에 받기",
    start_date: 20220805,
    end_date: 20220819,
    sido: "지역무관",
    now_person: 17,
    max_person: 60,
    image: 'https://cdn.pixabay.com/photo/2019/11/02/20/50/coffee-4597416_960_720.jpg'
  },

  {
    nickname: "니츠랜선이모",
    title: "일주일 동안 커피  텀블러에 받기",
    start_date: 20220805,
    end_date: 20220819,
    sido: "지역무관",
    now_person: 17,
    max_person: 60,
    image: 'https://cdn.pixabay.com/photo/2019/11/02/20/50/coffee-4597416_960_720.jpg'
  },
  {
    nickname: "니츠랜선이모",
    title: "일주일 동안 커피  텀블러에 받기",
    start_date: 20220805,
    end_date: 20220819,
    sido: "지역무관",
    now_person: 17,
    max_person: 60,
    image: 'https://cdn.pixabay.com/photo/2019/11/02/20/50/coffee-4597416_960_720.jpg'
  },
  {
    nickname: "니츠랜선이모",
    title: "일주일 동안 커피  텀블러에 받기",
    start_date: 20220805,
    end_date: 20220819,
    sido: "지역무관",
    now_person: 17,
    max_person: 60,
    image: 'https://cdn.pixabay.com/photo/2019/11/02/20/50/coffee-4597416_960_720.jpg'
  },
  {
    nickname: "니츠랜선이모",
    title: "일주일 동안 커피  텀블러에 받기",
    start_date: 20220805,
    end_date: 20220819,
    sido: "지역무관",
    now_person: 17,
    max_person: 60,
    image: 'https://cdn.pixabay.com/photo/2019/11/02/20/50/coffee-4597416_960_720.jpg'
  },
]

const PagI = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;



export default function MissionLists() {
  const remainder = MISSION.length % 5;
  const quot = parseInt(MISSION.length / 5);
  const page = useRecoilValue(missionLists)
  const setPage = useSetRecoilState(missionLists)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const router = useRouter();
  const missionDates = ({ mission_id }: { mission_id: number }) => {
    router.push(`/mission/${mission_id}/details`)
  }
  // console.log(MISSION.length)

  return (
    <>
      {MISSION.slice((page - 1) * 5, page * 5).map((item, index) => (
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
