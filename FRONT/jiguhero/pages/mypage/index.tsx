import { border, Box, color, Container } from "@mui/system";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Link from "next/link";
import { ButtonBorder, ButtonFull } from "styles/styled";
import { theme } from "pages/theme";
import { blue } from "@mui/material/colors";
import { Pagination } from "@mui/material";
import { userInfo } from "os";
<<<<<<< HEAD
import { RecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { missionPage, playedAreaPage,tabpage } from "states/mypage";
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { NextPageContext } from "node_modules/next/dist/shared/lib/utils";
import { useRouter } from "next/router";
import userData from "pages/api/user/[id]";
import missionUserData from "pages/api/mission/[id]";
import groundUserData from "pages/api/ground/[id]";
import { getToken } from "next-auth/jwt";

=======
import { useRecoilValue, useSetRecoilState } from "recoil";
import { missionPage,playedAreaPage } from "states/mypage";
import back from 'components/back';
>>>>>>> 61b5400ce78714854e305d0b0ba747fde799bc19

const Profile = styled("div")`
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
    color: #ff4848;
    font-size: 18px;
  }
<<<<<<< HEAD
`;

const BgImg = styled("div")`
  position: relative;
  width: 65px;
  height: 65px;

  border: 1px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, #ff4848, #ffd362);
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

=======
`;

const BgImg = styled("div")`
  position: relative;
  width: 65px;
  height: 65px;

  border: 1px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, #ff4848, #ffd362);
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

>>>>>>> 61b5400ce78714854e305d0b0ba747fde799bc19
const EntireContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: sm;
`;

const TextGroup = styled("div")`
  text-align: start;
  line-height: 2;
  p {
<<<<<<< HEAD
    font-family: "PyeongChang-Bold";
=======
    font-family: 'PyeongChang-Bold';
>>>>>>> 61b5400ce78714854e305d0b0ba747fde799bc19
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
<<<<<<< HEAD

  email: string;
=======
  userId: number;
  email: string;
  nickname: string;
>>>>>>> 61b5400ce78714854e305d0b0ba747fde799bc19
  name: string;
  grade: number;
  point: number;
}

<<<<<<< HEAD
const Mypage = ({data}) => {
  // console.log(props.data)

  
  const {data:userInfo} = useQuery(['mission'],()=> {userData()})
  console.log(userInfo)


  // 탭 전환
  const tab = useRecoilValue(tabpage);
  const setTab = useSetRecoilState(tabpage);
=======
const Mypage = (user_id) => {

  const [data, setData] = useState<Idata>();
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/user/1`, {
        headers: {
          Accept: "*/*",
        }
      })
      const json = await response.json();
      setData(json);
    })();
  }, []);
  console.log(data)
  // 탭 전환
  const [tab, setTab] = useState(true);
>>>>>>> 61b5400ce78714854e305d0b0ba747fde799bc19
  // 프로필
  function ProfileDiv() {
    return (
      <Profile>
<<<<<<< HEAD
        <BgImg>
          <img alt="nitz" src={`${data.session.user.image}`}/>
        </BgImg>
        <div>
          <p>빨강</p>
          <h2>{data.session.user.name}</h2>
=======
        <Back name={'마이페이지'} />
        <BgImg>
          <img alt="nitz" src='/IMG_1008.jpg'/>
        </BgImg>
        <div>
          <p>빨강</p>
          <h2>니츠</h2>
>>>>>>> 61b5400ce78714854e305d0b0ba747fde799bc19
        </div>
        <Box margin="14px 0 0 0">
          <ArrowForwardIosRoundedIcon sx={{ color: blue[300] }} />
        </Box>
      </Profile>
    );
  }

  // 임무
  function Mission() {
    const MissionList = ["하나", "둘", "셋", "넷", "다섯", "여섯"];
    const remainder = MissionList.length % 3;
    const quot = parseInt(MissionList.length / 3);
<<<<<<< HEAD
    const page = useRecoilValue(missionPage);
    const setPage = useSetRecoilState(missionPage);
=======
    const page = useRecoilValue(missionPage)
    const setPage = useSetRecoilState(missionPage)
>>>>>>> 61b5400ce78714854e305d0b0ba747fde799bc19
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    return (
      <>
        {MissionList.slice((page - 1) * 3, page * 3).map((num) => (
          <Link href="/" key={num}>
            <a>
              <Mis>{num}</Mis>
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

  // 활동구역
  function PlayingArea() {
    const PlayedArea = [
      { icon: "❤️", title: "내가 애정하는 친환경 카페" },
      { icon: "🏝", title: "제주도의 제로웨이스트 샵" },
      { icon: "🍽", title: "광주광역시의 비건식당" },
      { icon: "🍡", title: "재활용품 사용가게" },
      { icon: "🍘", title: "친환경 생활용품점" },
      { icon: "🍨", title: "유기농 디저트 맛집" },
    ];
    const remainder = PlayedArea.length % 3;
    const quot = parseInt(PlayedArea.length / 3);

<<<<<<< HEAD
    const page = useRecoilValue(playedAreaPage);
    const setPage = useSetRecoilState(playedAreaPage);
=======
    const page = useRecoilValue(playedAreaPage)
    const setPage = useSetRecoilState(playedAreaPage)
>>>>>>> 61b5400ce78714854e305d0b0ba747fde799bc19
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    return (
      <>
        {PlayedArea.slice((page - 1) * 3, page * 3).map((dic) => (
          <Link href="/" key={dic.title}>
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
<<<<<<< HEAD
  const onClickBox = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    
=======
  const onClickBox = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

>>>>>>> 61b5400ce78714854e305d0b0ba747fde799bc19
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
        <h3>현재 보유 포인트: 500</h3>
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
<<<<<<< HEAD
      <ButtonFull dColor={"#FF4848"} hColor={"#FF4848"}>
=======
      <ButtonFull  dColor={"#FF4848"} hColor={"#FF4848"}>
>>>>>>> 61b5400ce78714854e305d0b0ba747fde799bc19
        로그아웃
      </ButtonFull>
    </EntireContainer>
  );
};




// const Page = ({ pageProps}) => {
//   <SessionProvider session={pageProps.session}>
//     <Mypage />
//   </SessionProvider>


// }






export async function getServerSideProps(context) {
  const session2 = new QueryClient()
  const userInfo2 = new QueryClient()
  const missionInfo2 = new QueryClient()
  const groundInfo2 = new QueryClient()
  const session = await getSession(context);
  await session2.prefetchQuery(['session'], ()=> {return getSession(context)})
  await userInfo2.prefetchQuery(['userInfo'], ()=>{userData()})
  await missionInfo2.prefetchQuery(['missionUserInfo'], ()=>{missionUserData(context)})
  await groundInfo2.prefetchQuery(['groundUserInfo'], ()=>{groundUserData(context)})



    return {
      props: {
        data: {
          session,
          dehydratedState: dehydrate(userInfo2)
        },
      },
    };
  
}

export default Mypage;
