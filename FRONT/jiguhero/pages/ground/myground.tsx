import BackTitle from "components/back";
import styled from "styled-components";
import getMyGround from "pages/api/ground/getMyGround";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ButtonFull, ParentsDiv } from "styles/styled";
import { DeleteBtn } from "./[id]/edit";
import deleteGround from "pages/api/ground/deleteGround";
import { useRecoilState } from "recoil";
import { myGroundList } from "states/ground";
import Head from "next/head";

export const Grid = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media only screen and (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
  margin-left: 25px;
  margin-top: 20px;
  margin-right: 25px;
`;
const GroundDiv = styled("div")`
  border: 1px solid #65ace2;
  padding: 20px;
  border-radius: 20px;
  margin: 20px 10px;
  height: 90%;
  display: flex;
  position: relative;
  justify-content: center;
  :hover {
    .groundHover {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .groundDefault {
      display: none;
    }
  }
`;
const GroundItem = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const GroundHover = styled("div")`
  display: none;
  background-color: white;
`;
const GroundTitle = styled("p")`
  margin: 5px auto;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  word-break: keep-all;
`;
const GroundIcon = styled("p")`
  margin: 0;
  font-size: 25px;
`;
const GroundPlaceLength = styled("p")`
  margin: 0;
  font-size: 13px;
`;
const GroundTop = styled("div")`
  margin-left: 35px;
  @media only screen and (max-width: 650px) {
    margin-top: 20px;
  }
`;
const Input = styled("input")`
  border-radius: 10px;
  border: 1px solid #888888;
  height: 40px;
  width: 80%;
  padding: 15px;
  font-size: 15px;
`;
const SearchIcon = styled(SearchRoundedIcon)`
  color: #98c064;
  font-size: 30px;
  margin-left: 10px;
`;
const NoGround = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  p {
    margin: 10px;
  }
`;
const SelectBox = styled("select")`
  height: 40px;
  border: 1px solid #888888;
  border-radius: 10px;
  padding: 10px;
  display: inline-block;
  font-size: 15px;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none; /* 화살표 없애기 공통*/
  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
    @media only screen and (max-width: 650px) {
      width: 100%;
    }
  }
  @media only screen and (max-width: 650px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 400px) {
    width: 85%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const H2 = styled("h2")`
  @media only screen and (max-width: 650px) {
    display: none;
  }
`;
const ButtonSelect = styled("div")`
  @media only screen and (min-width: 400px) {
    display: flex;
    justify-content: space-between;
  }
  margin-top: 20px;
  /* display:'flex', justifyContent:'space-between', marginTop:'20px' */
`;
const Topbutton = styled("div")`
  margin-right: 30px;
  @media only screen and (max-width: 400px) {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
`;
const GroundButton = styled(ButtonFull)`
  width: 100%;
  margin: 5px 0;
  font-size: 15px;
`;
const DeleteB = styled(DeleteBtn)`
  z-index: 999;
`;

export default function GroundList() {
  const router = useRouter();
  const [groundList, setGroundList] = useRecoilState(myGroundList);
  const [searchItem, setSearchItem] = useState("");
  const [userId, setUserId] = useState();

  useEffect(() => {
    const usersId = JSON.parse(localStorage.getItem("recoil-persist")).userId;
    setUserId(usersId);
    getMyGround(
      Number(JSON.parse(localStorage.getItem("recoil-persist")).userId)
    ).then((res) => setGroundList(res));
  }, []);
  function Search(keyword) {
    if (keyword === "" && userId) {
      getMyGround(userId).then((res) => setGroundList(res));
    } else {
      const result = groundList.filter((ground) => {
        if (ground["title"].includes(keyword)) {
          return ground;
        }
      });
      setGroundList(result);
      setSearchItem("");
    }
  }

  function Filter(key) {
    if (key === "1") {
      let res = [...groundList];
      res.sort((a, b) => {
        return b.groundId - a.groundId;
      });
      setGroundList(res);
    } else if (key === "2") {
      let res = [...groundList];
      res.sort((a, b) => {
        return a.likes - b.likes;
      });
      setGroundList(res);
    } else if (key === "3") {
      let res = [...groundList];
      res.sort((a, b) => {
        return a.hits - b.hits;
      });
      setGroundList(res);
    } else if (key === "0" && userId) {
      getMyGround(userId).then((res) => setGroundList(res));
    }
  }

  return (
    <ParentsDiv>
      <Head>
        <title>나의 활동구역 | 지구-방위대</title>
      </Head>
      <BackTitle name={"나의 활동구역"} />
      <GroundTop>
        <H2>🦸🏻 나의 활동구역</H2>
        <p style={{ fontSize: "15px" }}>대원님의 활동구역을 보여드려요 🔍</p>
        <div style={{ display: "flex", alignContent: "center" }}>
          <Input
            placeholder="활동구역 검색하기"
            value={searchItem}
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
            onClick={() => {
              Search("");
            }}
          />
          <SearchIcon
            onClick={() => {
              Search(searchItem);
            }}
          />
        </div>
        <ButtonSelect>
          <SelectBox
            onChange={(e) => {
              Filter(e.target.value);
            }}
          >
            <option value="0">전체 보기</option>
            <option value="1">최신등록순</option>
            <option value="2">좋아요순</option>
            <option value="3">조회순</option>
          </SelectBox>
          <Topbutton>
            <ButtonFull
              dColor="#98c064"
              hColor="#65ace2"
              style={{ marginRight: "5px", fontSize: "15px" }}
              onClick={() => {
                router.push(`/ground`);
              }}
            >
              전체 보기
            </ButtonFull>
            <ButtonFull
              dColor="#65ace2"
              hColor="#98c064"
              style={{ fontSize: "15px" }}
              onClick={() => {
                router.push(`createground`);
              }}
            >
              활동구역 생성
            </ButtonFull>
          </Topbutton>
        </ButtonSelect>
      </GroundTop>
      {groundList?.length === 0 ? (
        <NoGround>
          <p style={{ fontSize: "50px" }}>🥲</p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>앗!</p>
          <p style={{ fontSize: "15px" }}>활동구역이 존재하지 않아요!</p>
          {/* <p style={{fontSize:'15px'}}>다른 키워드를 검색해볼까요?</p> */}
        </NoGround>
      ) : (
        <Grid>
          {groundList?.map((item) => (
            <GroundDiv key={item.groundId}>
              <DeleteB
                onClick={() => {
                  if (confirm("삭제하시겠습니까?") === true && userId) {
                    deleteGround(item.groundId, userId).then((res) => {
                      getMyGround(userId).then((res) => setGroundList(res));
                    });
                  }
                }}
              />
              <GroundItem className="groundDefault">
                <GroundIcon>{item.icon}</GroundIcon>
                <GroundTitle>{item.title}</GroundTitle>
                <GroundPlaceLength>{item.count}개의 장소</GroundPlaceLength>
              </GroundItem>
              <GroundHover className="groundHover">
                <GroundButton
                  dColor="#98c064"
                  hColor="#65ace2"
                  onClick={() => {
                    router.push(`${item.groundId}`);
                    console.log(item);
                  }}
                >
                  상세보기
                </GroundButton>
                <GroundButton
                  dColor="#98c064"
                  hColor="#65ace2"
                  onClick={() => {
                    router.push(`${item.groundId}/edit`);
                  }}
                >
                  수정하기
                </GroundButton>
              </GroundHover>
            </GroundDiv>
          ))}
        </Grid>
      )}
    </ParentsDiv>
  );
}
