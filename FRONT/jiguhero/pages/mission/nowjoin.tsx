import styled from "styled-components";
import NowJoin from "components/NowJoinLists";
import Head from "next/head";
import Backcomponents from "components/back";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React, { useState } from "react";
import NowJoinList from "components/NowJoinList";
import { Pagination } from "@mui/material";
import { nowjoinlist } from "states/mission";
import { useRecoilValue, useSetRecoilState } from "recoil";
import JoinMission from "pages/api/mission/joinMission";
import {
  dehydrate,
  Query,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ParentsDiv } from 'styles/styled'
interface IPage {
  page: number;
  count: number;
}

const PagI = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const H2 = styled('h2')`
  @media only screen and (max-width: 650px) {
    display:none;
  }
`

const MissionTop = styled('div')`
margin-left:35px;
@media only screen and (max-width: 650px) {
    margin-top:20px;
  }
`
const Block = styled("div")`
`;
const Content = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ListContent = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    margin-bottom:10px;
`;

const MissionBlock = styled("div")`

`;

const BoxSelect = styled("select")`
  border: #65ace2 solid 1px;
  background-color: white;
  border-radius: 15px;
  padding: 3px;
  margin: 0.5rem;
`;
const BoxInput = styled("input")`
  border: #65ace2 solid 1px;
  background-color: white;
  border-radius: 15px;
  padding: 3px;
  width: 12rem;
`;

const SearchButton = styled(SearchRoundedIcon)`
  color: #65ace2;
  margin: 0.5rem;
    :hover {
    cursor: pointer;
  }
`;


//select Box --- 최신등록 순 이름 순
const OPTIONS = [
  { value: "latest", name: "최신 등록순" },
  { value: "name", name: "이름순" },
  { value: "hits", name: "조회순" },
];
function SelectBox(props) {
  return (
    <BoxSelect>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </BoxSelect>
  );
}

//input Box
function InputBox() {
  const [text, setText] = useState("");
  const onChange = (event) => {
    setText(event.target.value);
    // console.log(event.target.value)
  };
  return (
    <div>
      <BoxInput
        type="text"
        placeholder="검색어를 입력해주세요."
        onChange={onChange}
        value={text}
      />
    </div>
  );
}

export default function nowJoin() {
  const userId = 2

  function NowJoinLists() {
    const { data: JoinMissionData } = useQuery(["nowMissions"], () => { JoinMission(userId) });

    const remainder = JoinMissionData?.length % 5;
    const JoinLen = `${JoinMissionData?.length / 5}`;
    const quot = parseInt(JoinLen);
    const page = useRecoilValue(nowjoinlist);
    const setPage = useSetRecoilState(nowjoinlist);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    return (
      <>
        {JoinMissionData?.slice((page - 1) * 5, page * 5).map((item, index) => (
          <NowJoinList key={index} {...item} />
        ))}
        {remainder && (
          <PagI
            count={remainder === 0 ? quot : quot + 1}
            page={page}
            onChange={handleChange}
          />
        )}
      </>
    );
  }

  return (
    <ParentsDiv>
      <Head>
        <title>참여 중인 임무 | 지구-방위대</title>
      </Head>


      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <Backcomponents name="참여 중인 임무 모아보기"></Backcomponents>
      <MissionTop>
        <H2>🦸🏻 참여 중인 임무 모아보기</H2>
      </MissionTop>

      <Block style={{ marginBottom: '10px' }}>
        <Content>
          <SelectBox options={OPTIONS} />
          <InputBox />
          <SearchButton />
        </Content>
      </Block>

      <MissionBlock>
        <ListContent>
          <NowJoinLists />
        </ListContent>
      </MissionBlock>

    </ParentsDiv>
  );
}
