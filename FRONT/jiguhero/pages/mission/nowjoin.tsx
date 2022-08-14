import styled from "styled-components";
<<<<<<< HEAD
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

const NavBar = styled("div")`
  z-index: 999;
  position: fixed;
  left: 0;
  right: 0;
  top: 60px;
  height: 60px;
  /* padding: 2rem; */
  color: white;
  background: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (min-width: 650px) {
    display: none;
  }
`;
const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  margin: 0px 5px 0px 20px;
`;

const BackCompo = styled(Backcomponents)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Block = styled("div")`
  margin: 0.5rem;
`;
const Content = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 360px) {
    width: 400px;
  }
  @media screen and (min-width: 550px) {
    width: 500px;
  }
  @media screen and (min-width: 700px) {
    width: 620px;
  }
`;

const ListContent = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 360px) {
    width: 400px;
  }
  @media screen and (min-width: 550px) {
    width: 500px;
  }
  @media screen and (min-width: 700px) {
    width: 620px;
  }
`;

const MissionBlock = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 13rem;
`;
=======
import NowJoin from "components/NowJoinLists"
import Head from 'next/head';
import Backcomponents from 'components/back';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import React, { useState } from 'react';
import { ParentsDiv } from 'styles/styled'


const Block = styled('div')`
`
const Content = styled('div')`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ListContent = styled('div')`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom:10px;
`

const MissionBlock = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
`

const BoxSelect = styled('select')`
    border: #65ACE2 solid 1px;
    background-color: white;
    border-radius: 15px;
    padding:3px;
    margin: 0.5rem;
`
const BoxInput = styled('input')`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  padding:3px;
  width: 12rem;
`
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a

const SearchButton = styled(SearchRoundedIcon)`
  color: #65ace2;
  margin: 0.5rem;
`;

<<<<<<< HEAD
const Div = styled("div")`
  padding: 20px;
`;

const ContentsWrapper = styled("div")`
  @media screen and (max-width: 393px) {
    margin-left: 50px;
  }
`;

//select Box --- 최신등록 순 이름 순
=======

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
//select Box --- 최신등록 순 이름 순 
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
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
    const { data: JoinMissionData } = useQuery(["nowMissions"],()=>{JoinMission(userId)});
    
    const remainder = JoinMissionData?.length % 5;
    const JoinLen = `${JoinMissionData?.length / 5}`;
    const quot = parseInt(JoinLen);
    const page = useRecoilValue(nowjoinlist);
    const setPage = useSetRecoilState(nowjoinlist);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    return (
<<<<<<< HEAD
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
    <div>
      <Head>
        <title>참여 중인 임무 | 지구-방위대</title>
      </Head>

      <NavBar>
        <Header>
          {/* 모바일 뷰에서 뒤로가기 버튼! */}
          <BackCompo name="참여 중인 임무 모아보기"></BackCompo>
        </Header>
      </NavBar>

      <Div></Div>

      <ContentsWrapper>
        <Block>
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
      </ContentsWrapper>
    </div>
  );
}
=======
        <ParentsDiv>
            <Head>
                <title>참여 중인 임무 | 지구-방위대</title>
            </Head>
            {/* 모바일 뷰에서 뒤로가기 버튼! */}
            <Backcomponents name='참여 중인 임무 모아보기'></Backcomponents>


            <MissionTop>
                <H2>🦸🏻 참여 중인 임무</H2>
            </MissionTop>
            <Block style={{ marginBottom: '10px' }}>
                <Content>
                    <SelectBox options={OPTIONS} />
                    <InputBox />
                    <SearchButton />
                </Content>
            </Block>

            {/*components의 NowJoinList와 NowJoinLists는 api joinMission.ts에서
                        //데이터를 받아오는데 api 더미가 없어서 임시로 대원들의 임무리스트에서 확인함.*/}
            <MissionBlock>
                <ListContent>
                    <NowJoin />
                </ListContent>
            </MissionBlock>

        </ParentsDiv>
    )

}
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
