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
// import { Pagination } from "@mui/material";
import { missionLists, searchText } from "states/mission";
import MissionList from "components/MissionList";
import getSido from "pages/api/ecomarket/getSido";
import searchMission from "pages/api/mission/searchMission";
import { ParentsDiv } from 'styles/styled'
import Pagination from 'components/pagination';

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
  padding: 10px;
  font-size:15px;
  margin: 0.5rem;
`;
const BoxInput = styled("input")`
  border: #65ace2 solid 1px;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  font-size:15px;
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
          style={{fontSize:'15px'}}
        >
          참여 중인 임무 모아보기
        </ButtonFull>
        <ButtonFull
          dColor={"#98C064"}
          hColor={"#65ACE2"}
          onClick={() => router.push("/mission/createmission")}
          style={{fontSize:'15px'}}
        >
          임무생성
        </ButtonFull>
      </ButtonGroup>
    </>
  );
}

//전체 출력 페이지

export default function Mission({ data }) {
  // const [cate, setCate] = useState<string>("time"); // 카테고리 최신순, 조회순, 이름순
  // const [flag, setFlag] = useState(false) // false 검색어 없는 전체 목록, true 검색어 있는 목록
  const router = useRouter()
  const [cmd, setCmd] = useState<string>('');
  const [page, setPage] = useState(1);
  const [missions, setMissions] = useState([
    {
      missionId:0,
      likes:0,
      nowPerson:0,
    }
  ]);
  const count: number = missions?.length
  const [tmp, setTmp] = useState<string>();
  const handlePageChange = (page) => {
    setPage(page)
  }
  const OPTIONS = [
    { value: "time", name: "최신등록순" },
    { value: "likes", name: "좋아요순" },
    { value: "person", name: "참여자순" },
  ];
  // const { data: Missions, isLoading } = useQuery(
  //   ["missions", { cmd, cate }],
  //   searchMission
  // );
  // if(Missions){
  //   setMissions(Missions)
  // }
  useEffect(()=>{
    if(!localStorage.getItem('access-token')){
      alert("로그인해주세요")
      router.push('/login')
    }else{
      getMission().then((res)=>setMissions(res))
    }

  }, [])
  
  function Filter(key){
    if(missions){
      if(key === 'time'){
        let res = [...missions];
              res.sort((a, b)=>{
                  return b.missionId - a.missionId
              })
              setMissions(res)
      }else if(key === 'likes'){
        let res = [...missions];
              res.sort((a, b)=>{
                return b.likes - a.likes
              })
              setMissions(res)
      }else if(key === 'person'){
        let res = [...missions];
              res.sort((a, b)=>{
                  return b.nowPerson - a.nowPerson
              })
              console.log(res)
              setMissions(res)
      }
    }
  }
  function Search(keyword){
    if(keyword === ''){
        getMission().then(
            (res) => setMissions(res)
        )
    }else{
        const result = missions.filter((ground) => {
            if(ground['title'].includes(keyword)){
                return ground
            }})
        setMissions(result)
        setTmp("")
    }
}

  // useEffect(() => {
  //   getMission({});
  // }, [cate]);

  //select Box --- 최신등록 순 이름 순



    // if (flag) {
    //   const { data: Missions } = useQuery(
    //     ["missions", { cmd, cate }],
    //     searchMission
    //   )
    // } else {
    //   const { data: Missions, isLoading } = useQuery(
    //     ["missions", { cate }],
    //     getMission, {

    //   }
    //   );
    // }

  //   const remainder = Missions?.length % 5;
  //   const MissionLen = `${Missions?.length / 5}`;
  //   const quot = parseInt(MissionLen);
  //   const page = useRecoilValue(missionLists);
  //   const setPage = useSetRecoilState(missionLists);
  //   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value);
  //   };


  //   return (
  //     <>
  //       {Missions?.slice((page - 1) * 5, page * 5).map((item, index) => (
  //         <MissionList key={index} {...item} />
  //       ))}
  //       {remainder && (
  //         <PagI
  //           count={remainder === 0 ? quot : quot + 1}
  //           page={page}
  //           onChange={handleChange}
  //         />
  //       )}

  //     </>
  //   );
  // }

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
        <BoxSelect
        onChange={(e) => {
          e.preventDefault()
          Filter(e.target.value);
        }}
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
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

      {/* 임무 목록들 */}

      <MissionBlock>
        <ListContent>
          {count !== undefined ? 
      <>
        {missions?.slice((page - 1) * 5, page * 5).map((item, index) => (
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

// export async function getServerSideProps(context) {
//   const missionList = new QueryClient();
//   await missionList.prefetchQuery(["missions", [null, "time"]], getMission);
//   // console.log(dehydrate(missionList).queries[0].state.data)
//   return {
//     props: {
//       dehydratedState: dehydrate(missionList)
//     },
//   };