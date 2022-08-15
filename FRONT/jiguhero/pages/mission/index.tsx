import styled from "styled-components";
import { ButtonFull, ButtonBorder } from "styles/styled";
import Backcomponents from "components/back";
import Head from "next/head";
import React, { memo, useEffect, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter } from "next/router";
import {
  dehydrate,
  Query,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import getMission from "pages/api/mission/index";
import MissionLists from "components/MissionLists";
import { setUncaughtExceptionCaptureCallback } from "process";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Pagination } from "@mui/material";
import { missionLists, searchText } from "states/mission";
import MissionList from "components/MissionList";
import getSido from "pages/api/ecomarket/getSido";
import searchMission from "pages/api/mission/searchMission";
import { ParentsDiv } from 'styles/styled'

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
const ButtonContent = styled("div")`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

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
const ButtonGroup = styled("div")`
  button {
    margin: 5px;
  }
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


const PagI = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

//mission Button
function ButtonBox() {
  const router = useRouter();
  return (
    <>
      <ButtonGroup>
        <ButtonFull
          hColor={"#98C064"}
          dColor={"#65ACE2"}
          onClick={() => router.push("/mission/nowjoin")}
        >
          참여 중인 임무 모아보기
        </ButtonFull>
        <ButtonFull
          dColor={"#98C064"}
          hColor={"#65ACE2"}
          onClick={() => router.push("/mission/createmission")}
        >
          임무생성
        </ButtonFull>
      </ButtonGroup>
    </>
  );
}

//전체 출력 페이지

export default function Mission({ data }) {
  const [cate, setCate] = useState<string>("time"); // 카테고리 최신순, 조회순, 이름순
  const [flag, setFlag] = useState(false) // false 검색어 없는 전체 목록, true 검색어 있는 목록
  const [cmd, setCmd] = useState<string>('');

  const { data: Missions, isLoading } = useQuery(
    ["missions", { cmd, cate }],
    searchMission
  );

  // useEffect(() => {
  //   getMission({});
  // }, [cate]);

  //select Box --- 최신등록 순 이름 순
  const OPTIONS = [
    { value: "time", name: "최신 등록순" },
    { value: "title", name: "이름순" },
    { value: "hits", name: "조회순" },
  ];
  useEffect(()=>{
    fetch(`https://i7c105.p.ssafy.io:8080/mission?array=title`, {
      method:'GET',
      headers:{
          Authorization : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjU5NTk2MjE2LCJleHAiOjE2NjEzOTYyMTZ9.EFvEjb89aJTp2E9BZGFodNJdlQ034dvQ78YEHwOXjLyuQhnUCQYIlfkh2NUeNYSxHWwu1O_UFosRrODXoSqsAA'
      }
  }).then((res) => console.log("fetch", res.json()))
  }, [])
  function SelectBox(props) {
    return (
      <BoxSelect
        onChange={(e) => {
          e.preventDefault()
          setCate(e.target.value);
        }}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </BoxSelect>
    );
  }

  function MissionLists({ selector }) {


    if (flag) {
      const { data: Missions } = useQuery(
        ["missions", { cmd, cate }],
        searchMission
      )
    } else {
      const { data: Missions, isLoading } = useQuery(
        ["missions", { cate }],
        getMission, {

      }
      );
    }


    const remainder = Missions?.length % 5;
    const MissionLen = `${Missions?.length / 5}`;
    const quot = parseInt(MissionLen);
    const page = useRecoilValue(missionLists);
    const setPage = useSetRecoilState(missionLists);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };


    return (
      <>
        {Missions?.slice((page - 1) * 5, page * 5).map((item, index) => (
          <MissionList key={index} {...item} />
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

  const SearchInput = () => {
    // const [text,setText] = useRecoilState(searchText)
    const [tmp, setTmp] = useState<string>();

    return (
      <>
        <div>
          <BoxInput
            type="text"
            id="search"
            placeholder="검색어를 입력해주세요."
            onChange={(e) => {
              e.preventDefault();
              setTmp(e.target.value);
            }}
            value={tmp}
          />
        </div>
        <SearchButton
          onClick={(e) => {
            e.preventDefault();
            // setText(tmp)
            setCmd(tmp);
          }}
        />
      </>
    );
  };
  const router = useRouter();
  return (
    <ParentsDiv>
      {/* 헤더 */}
      <Head>
        <title>대원들의 임무 | 지구-방위대</title>
      </Head>


      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <Backcomponents name="대원들의 임무"></Backcomponents>
      <MissionTop>
        <H2>🦸🏻 대원들의 임무</H2>
        <button onClick={()=>{router.push('mission/missionfeed')}}>실화?</button>
      </MissionTop>



      {/* contents! */}
      {/* 임무 버튼 그룹 */}
      <Block style={{ marginBottom: '10px', marginTop: '20px' }}>
        <ButtonContent>
          <ButtonBox />
        </ButtonContent>
      </Block>

      {/* search Bar */}
      <Block style={{ marginBottom: '10px' }}>
        <Content>
          <SelectBox options={OPTIONS} />
          <SearchInput />
        </Content>
      </Block>

      {/* 임무 목록들 */}

      <MissionBlock>
        <ListContent>
          <MissionLists selector={cate} />
        </ListContent>
      </MissionBlock>

    </ParentsDiv>
  );
}

export async function getServerSideProps(context) {
  const missionList = new QueryClient();
  await missionList.prefetchQuery(["missions", [null, "time"]], getMission);
  // console.log(dehydrate(missionList).queries[0].state.data)
  return {
    props: {
      dehydratedState: dehydrate(missionList)
    },
  };
}
