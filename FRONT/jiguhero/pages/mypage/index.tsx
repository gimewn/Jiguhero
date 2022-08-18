import { border, Box, color, Container } from "@mui/system";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Link from "next/link";
import { ButtonBorder, ButtonFull } from "styles/styled";
import { theme } from "components/theme";
import { blue } from "@mui/material/colors";
import { Pagination } from "@mui/material";
import { userInfo } from "os";
import { RecoilState, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { missionPage, playedAreaPage, tabpage } from "states/mypage";
import {
  dehydrate,
  Query,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { NextPageContext } from "node_modules/next/dist/shared/lib/utils";
import { useRouter } from "next/router";
import userData from "pages/api/user/[id]";
import missionUserData from "pages/api/mission/[id]";
import groundUserData from "pages/api/ground/[id]";
import userGround from "pages/api/user/userGround";
import userMission from "pages/api/user/userMission";
import { UserId } from "states/user";

const Profile = styled("div")<{ color1: string }>`
  display: flex;
  h2 {
    font-size: 28px;
    margin: 0px 60px 10px 20px;
  }
  box {
    margin: 30px;
  }
  &:hover {
    cursor: pointer;
  }
  div p {
    font-family: "PyeongChangPeace-Bold";
    margin: 10px 60px 0px 20px;
    color: ${(props) => props.color1};
    font-size: 18px;
  }
`;

const BgImg = styled("div")<{ color1: string; color2: string }>`
  position: relative;
  width: 65px;
  height: 65px;

  border: 1px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.color1},
    ${(props) => props.color2}
  );
  background-origin: border-box;
  background-clip: content-box, border-box;
  img {
    display: flex;
    align-items: center;
    left: 3.5px;
    top: 3.5px;
    justify-content: center;
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
`;

const EntireContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: sm;
  @media only screen and (max-width: 650px) {
    margin-bottom:85px;
  }
`;

const TextGroup = styled("div")`
  text-align: start;
  line-height: 2;
  p {
    font-family: "PyeongChang-Bold";
  }
`;

const ButtonGroup = styled("div")`
  button {
    margin: 5px;
  }
`;

const Play = styled("div")`
  border-radius: 20px;
  border: solid 1px #65ace2;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 250px;
  height: 80px;
  font-size: 13px;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
  p {
    margin: 4px;
  }
`;

const Mis = styled("div")`
  border-radius: 20px;
  border: solid 1px #65ace2;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 250px;
  height: 80px;
  font-size: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const PagI = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

interface Idata {
  email: string;
  name: string;
  grade: number;
  point: number;
  imageURL: string;
  nickname: string;
}

const Mypage = ({ data }) => {

  
  const router = useRouter();
  const [recoiluser, setRecoiluser ] = useRecoilState(UserId)
  const [userId, setUserId] = useState();
  const [gradeName, setGradeName] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [userIn, setUserIn] = useState<Idata>();
  const [userGroundData, setUserGroundData] = useState([]);
  const [userMissionData, setUserMissionData] = useState([]);
  const [grade, setGrade] = useState(0);

  const theme = {
    Bbalgang: {
      first: " #FF4848 ",
      second: " #FFD362"
    },
    Parang: {
      first: "#4B5DFF",
      second: "#FF4FAE"
    },
    Chorok: {
      first: "#349724",
      second: " #FF6B6B"
    },
    Norang: {
      first: " #FFC700",
      second: "#8FAA73"
    },
    Bunhong: {
      first: " #FF9898",
      second: "#7379AA"
    }
  };

  useEffect(() => {
    const usersId =  JSON.parse(localStorage.getItem("recoil-persist")).userId;
    setUserId(usersId);
    userData(usersId).then((data) =>{setUserIn(data)
      setGrade(data.grade)
      if (data.grade == 0) {
        setColor1(theme.Bunhong.first);
        setColor2(theme.Bunhong.second);
        setGradeName("분홍");
      } else if (data.grade == 1) {
        setColor1(theme.Norang.first);
        setColor2(theme.Norang.second);
        setGradeName("노랑");
      } else if (data.grade == 2) {
        setColor1(theme.Chorok.first);
        setColor2(theme.Chorok.second);
        setGradeName("초록");
      } else if (data.grade == 3) {
        setColor1(theme.Parang.first);
        setColor2(theme.Parang.second);
        setGradeName("파랑");
      } else if (data.grade == 4) {
        setColor1(theme.Bbalgang.first);
        setColor2(theme.Bbalgang.second);
        setGradeName("빨강");
      }});
    userGround(usersId).then((data) => setUserGroundData(data));
    userMission(usersId).then((data) => setUserMissionData(data));
  }, []);

  useEffect(() => {
    if (grade == 0) {
      setColor1(theme.Bunhong.first);
      setColor2(theme.Bunhong.second);
      setGradeName("분홍");
    } else if (grade == 1) {
      setColor1(theme.Norang.first);
      setColor2(theme.Norang.second);
      setGradeName("노랑");
    } else if (grade == 2) {
      setColor1(theme.Chorok.first);
      setColor2(theme.Chorok.second);
      setGradeName("초록");
    } else if (grade == 3) {
      setColor1(theme.Parang.first);
      setColor2(theme.Parang.second);
      setGradeName("파랑");
    } else if (grade == 4) {
      setColor1(theme.Bbalgang.first);
      setColor2(theme.Bbalgang.second);
      setGradeName("빨강");
    }
  }, [userIn]);

  // 탭 전환
  const tab = useRecoilValue(tabpage);
  const setTab = useSetRecoilState(tabpage);
  console.log(userGround)
  // 프로필
  function ProfileDiv() {
    return (
      <Profile color1={color1}>
        <BgImg color1={color1} color2={color2}>
          <img alt="nitz" src={userIn?.imageURL} />
        </BgImg>
        <div>
          <p>{gradeName}</p>

          <h2>{userIn?.nickname}</h2>
        </div>
        <Box margin="14px 0 0 0">
          <ArrowForwardIosRoundedIcon sx={{ color: blue[300] }} />
        </Box>
      </Profile>
    );
  }

  // 임무
  function Mission() {
    
    const remainder = userMissionData?.length % 5;
    const lenMission = `${userMissionData?.length / 5}`;
    const quot = parseInt(lenMission);
    const page = useRecoilValue(missionPage);
    const setPage = useSetRecoilState(missionPage);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    return (
      <>
        {userMissionData?.slice((page - 1) * 5, page * 5).map((item,index) => (
          <Link href={`/mission/${item.missionId}`} key={index}>
            <a>
              <Mis>{item.title}</Mis>
            </a>
          </Link>
        ))}
        <PagI
          count={remainder === 0 ? Number(quot) : Number(quot) + 1}
          page={page}
          onChange={handleChange}
        />
      </>
    );
  }

  // 활동구역
  function PlayingArea() {
    
    const remainder = userGroundData?.length % 5;
    const lenPlay = `${userGroundData?.length / 5}`;
    const quot = parseInt(lenPlay);
    const page = useRecoilValue(playedAreaPage);
    const setPage = useSetRecoilState(playedAreaPage);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };
    console.log(userGroundData)
    return (
      
      <>
        {userGroundData?.slice((page - 1) * 5, page * 5).map((dic) => (
          <Link href={`/ground/${dic.groundId}`} key={dic.title}>
            <a>
              <Play key={dic.title}>
                <p>{dic.icon}</p>
                <span>{dic.title}</span>
              </Play>
            </a>
          </Link>
        ))}
        <PagI
          count={remainder === 0 ? quot : quot + 1}
          page={page}
          onChange={handleChange}
        />
      </>
      
    );
  }

  // 프로필 클릭
  const onClickBox = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push("/mypage/profile");
  };

  return (
    <EntireContainer>
      <Box onClick={onClickBox}>
        <Grid container>
          <Grid item xs={12}>
            <ProfileDiv />
          </Grid>
        </Grid>
      </Box>
      <TextGroup>
        <h3>현재 보유 포인트: {userIn?.point}</h3>
        <p>👀내가 좋아요한 활동구역 & 임무</p>
      </TextGroup>
      <ButtonGroup>
        {tab ? (
          <ButtonFull
            dColor={"#98C064"}
            hColor={"#65ACE2"}
            onClick={() => {
              setTab(true);
            }}
          >
            활동구역
          </ButtonFull>
        ) : (
          <ButtonBorder
            dColor={"#65ACE2"}
            onClick={() => {
              setTab(true);
            }}
          >
            활동구역
          </ButtonBorder>
        )}
        {tab ? (
          <ButtonBorder
            dColor={"#65ACE2"}
            onClick={() => {
              setTab(false);
            }}
            color={tab ? "hanle" : "yeondoo"}
          >
            임무
          </ButtonBorder>
        ) : (
          <ButtonFull
            dColor={"#98C064"}
            hColor={"#65ACE2"}
            onClick={() => {
              setTab(false);
            }}
          >
            임무
          </ButtonFull>
        )}
      </ButtonGroup>
      <Box>{tab ? <PlayingArea /> : <Mission />}</Box>
      <ButtonFull
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("access-token");
          localStorage.removeItem("recoil-persist");
          router.push("/");
        }}
        dColor={"#FF4848"}
        hColor={"#FF4848"}
      >
        로그아웃
      </ButtonFull>{" "}
    </EntireContainer>
  );
};

// export async function getServerSideProps(context) {
//   const session2 = new QueryClient();
//   const userInfo2 = new QueryClient();
//   const missionInfo2 = new QueryClient();
//   const groundInfo2 = new QueryClient();

//   // await userInfo2.prefetchQuery(["userInfo"], () => {
//   //   userData();
//   // });
//   // await missionInfo2.prefetchQuery(["missionUserInfo"], () => {
//   //   missionUserData();
//   // });
//   // await groundInfo2.prefetchQuery(["groundUserInfo"], () => {
//   //   groundUserData(context);
//   // });

//   return {
//     props: {
//       data: {
//         // dehydratedState: dehydrate(userInfo2),
//       },
//     },
//   };
// }

export default Mypage;
