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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 5px;
  :hover {
    cursor: pointer;
  }

  @media screen and (min-width: 360px) {
    width: 320px;
  }
  @media screen and (min-width: 450px) {
    width: 350px;
  }
  @media screen and (min-width: 700px) and (max-width: 1400) {
    width: 500px;
  }
`;

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
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
