import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import getSido from "pages/api/ecomarket/getSido";
import { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import getGugun from "pages/api/ecomarket/getGugun";

const List = styled("div")`
  border: 1px solid #98c064;
  border-radius: 15px;
  height: 150px;
<<<<<<< HEAD
  display: flex;
  flex-direction: row;
=======
  display:flex;
  /* flex-direction: row;
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
  align-items: center;
  justify-content: center; */
  overflow: hidden;
  margin: 5px;
  :hover {
    cursor: pointer;
  }

<<<<<<< HEAD
  @media screen and (min-width: 360px) {
    width: 320px;
=======
  /* @media screen and (min-width: 360px){
      width:320px;
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
  }
  @media screen and (min-width: 450px) {
    width: 350px;
  }
<<<<<<< HEAD
  @media screen and (min-width: 700px) and (max-width: 1400) {
    width: 500px;
  }
`;
=======
  @media screen and (min-width: 700px) and (max-width:1400){
      width:500px;
  } */
`
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a

const ListImg = styled("div")<{ image: string }>`
  background-image: url("${(props) => props.image}");
  background-size: cover;
  background-position: center;
  width: 150px;
  height: 150px;
  border: 1px solid none;
  float: left;
`;
const ListContent = styled("div")`
  width: 200px;
  height: 150px;
  border: 1px solid none;
  /* float: left; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

<<<<<<< HEAD
const TextWrapper = styled("div")`
  margin: 4px;
`;

const TitleName = styled("a")`
  font-size: 1rem;
  font-weight: bolder;
`;
const Name = styled("a")`
  font-size: 0.75rem;
`;
const Date = styled(Name)``;
const JoinPeople = styled(Name)``;
const PointBtn = styled("div")`
=======
const TextWrapper = styled('div')`
  margin-left: 15px;
  margin-right: auto;
`

const TitleName = styled('h1')`
  font-size: 1rem;
  font-weight: bolder;
  margin: 0;
`
const Name = styled('p')`
font-size: 0.75rem;
  margin-top: 5px;
  margin-bottom: 0;
`
const Date = styled(Name)`
`
const JoinPeople = styled(Name)`
`
const PointBtn = styled('div')`
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
  border-radius: 12.5px;
  padding: 5px;
  border: 1px solid #98c064;
  background-color: #98c064;
  color: white;
  font-size: x-small;
  margin-left: auto;
  margin-right: 15px;
`;

interface MissionProps {
  entryPoint: number;
  title: string;
  startDate: string;
  endDate: string;
  sidoCode: string;
  nowPerson: number;
  maxPerson: number;
  repImageURL: string;
  missionId: number;
  content: string;
  gugunCode: string;
  dongCode: string;
}

<<<<<<< HEAD
export default function MissionList({
  missionId,
  entryPoint,
  title,
  startDate,
  endDate,
  sidoCode,
  gugunCode,
  nowPerson,
  maxPerson,
  repImageURL,
}: MissionProps) {
=======
export default function MissionList({ missionId, entryPoint, title, startDate, endDate, sidoCode, nowPerson, maxPerson, repImageURL }: MissionProps) {
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
  const router = useRouter();
  const [nowsido, setNowsido] = useState<string>("");
  const [nowgugun, setNowgugun] = useState<string>("");
  const { data: sido } = useQuery(["sido"], getSido, {
    onSettled: (sido, error) => {
      sido.map((item, index) => {
        if (item["sidoCode"] === sidoCode.toString()) {
          setNowsido(item["sidoName"]);
          return;
        }
      });
    },
  });

  const { data: gugun } = useQuery(
    ["gugun", sidoCode],
    () => getGugun(sidoCode),
    {
      onSettled: (gugun, error) => {
        gugun.map((item, index) => {
          if (item["gugunCode"] === gugunCode) {
            setNowgugun(item["gugunName"]);
            return;
          }
        });
      },
    }
  );

 

  return (
    <>
      <List onClick={() => router.push(`/mission/${missionId}`)}>
        <ListImg image={repImageURL} />
        <ListContent>
<<<<<<< HEAD
          <div>
            <TextWrapper>
              <TitleName>{title}</TitleName>
            </TextWrapper>
            <TextWrapper>
              <Date>
                {startDate}~{endDate}
              </Date>
            </TextWrapper>
            <TextWrapper>
              <Name>{nowgugun}</Name>
            </TextWrapper>
            <TextWrapper>
              <JoinPeople>
                {nowPerson} / {maxPerson}명
              </JoinPeople>
            </TextWrapper>
          </div>
=======
          <TextWrapper>
            <TitleName>{title}</TitleName>
            <Name>{sidoCode}</Name>
            <Date>{startDate}~{endDate}</Date>
            <JoinPeople>{nowPerson} / {maxPerson}명</JoinPeople>
          </TextWrapper>
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
          <PointBtn>+{entryPoint}</PointBtn>
        </ListContent>
      </List>
    </>
  );
}

export async function getServerSideProps(context) {
  const sidoList = new QueryClient();
  await sidoList.prefetchQuery(["sido"], getSido);
  // console.log(dehydrate(missionList).queries[0].state.data)
  return {
    props: {
      // dehydratedState: dehydrate(sidoList)
    },
  };
}
