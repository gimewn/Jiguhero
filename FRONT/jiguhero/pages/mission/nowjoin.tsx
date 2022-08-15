import styled from "styled-components";
import NowJoin from "components/NowJoinLists";
import Head from "next/head";
import Backcomponents from "components/back";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React, { useEffect, useState } from "react";
import MissionList from "components/MissionList";
import Pagination from 'components/pagination';
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
  padding: 10px;
  font-size:15px;
  margin: 0.5rem;
`;
const BoxInput = styled("input")`
  border: #65ace2 solid 1px;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  font-size: 15px;
  width: 12rem;
`;

const SearchButton = styled(SearchRoundedIcon)`
  color: #65ace2;
  margin: 0.5rem;
    :hover {
    cursor: pointer;
  }
`;


export default function nowJoin() {
  const [JoinMissionData, setJoinMissionData] = useState([]);
  const [userId, setUserId] = useState();
  const [tmp, setTmp] = useState<string>();
  const [page, setPage] = useState(1);
  const OPTIONS = [
    { value: "time", name: "최신등록순" },
    { value: "likes", name: "좋아요순" },
    { value: "person", name: "참여자순" },
  ];
  const count: number = JoinMissionData?.length
  useEffect(()=>{
    const usersId = JSON.parse(localStorage.getItem('recoil-persist')).userId
    setUserId(usersId)
}, [])
useEffect(()=>{
  if(userId && JoinMissionData.length === 0){
    JoinMission(userId).then((res)=>{
      setJoinMissionData(res)
  })
  }
})
  // const remainder = JoinMissionData?.length % 5;
  // const JoinLen = `${JoinMissionData?.length / 5}`;
  // const quot = parseInt(JoinLen);
  const handlePageChange = (page) => {
    setPage(page)
  }
  function Filter(key){
    if(JoinMissionData){
      if(key === 'time'){
        let res = [...JoinMissionData];
              res.sort((a, b)=>{
                  return b.missionId - a.missionId
              })
              setJoinMissionData(res)
      }else if(key === 'likes'){
        let res = [...JoinMissionData];
              res.sort((a, b)=>{
                return b.likes - a.likes
              })
              setJoinMissionData(res)
      }else if(key === 'person'){
        let res = [...JoinMissionData];
              res.sort((a, b)=>{
                  return b.nowPerson - a.nowPerson
              })
              console.log(res)
              setJoinMissionData(res)
      }
    }
  }
  function Search(keyword){
    if(keyword === ''){
      JoinMission(userId).then(
            (res) => setJoinMissionData(res)
        )
    }else{
        const result = JoinMissionData.filter((ground) => {
            if(ground['title'].includes(keyword)){
                return ground
            }})
            setJoinMissionData(result)
        setTmp("")
    }
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
        <BoxSelect
        onChange={(e) => {
          e.preventDefault()
          Filter(e.target.value);
        }}
      >
        {OPTIONS.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </BoxSelect>
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
          onClick={()=>{Search(tmp)}}
        />
        </Content>
      </Block>

      <MissionBlock>
        <ListContent>
        
        {count !== undefined ? 
      <>
        {JoinMissionData?.slice((page - 1) * 5, page * 5).map((item, index) => (
          <MissionList key={index} {...item} />))}
        <Pagination page={page} totalcount={count} setPage={handlePageChange} />
      </> 
        :
        <></>}
        </ListContent>
      </MissionBlock>

    </ParentsDiv>
  );
}
