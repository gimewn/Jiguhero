import Head from "next/head";
import styled from "styled-components";
// import Backcomponents from 'components/back';
import {
  dehydrate,
  Query,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import missionUserData from "pages/api/mission/[id]";
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { ButtonFull, ButtonBorder } from "styles/styled";
import { useRouter } from "next/router";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import { useEffect, useState } from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { UserId, UserName } from "states/user";

const NavBar = styled("header")`
  z-index: 999;
  position: fixed;
  left: 0;
  right: 0;
  top: 60px;
  height: 60px;

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
  width: 100%;
  margin: 0px 5px 0px 20px;
`;

const DetailWrapper = styled("div")`
  margin-top: 20px;
  margin-bottom: 160px;
  max-width: 500px;
`;
const MobileMore = styled(MoreVertRoundedIcon)`
  color: #98c064;
  :hover {
    cursor: pointer;
  }
  @media only screen and (min-width: 650px) {
    display: none;
  }
`;

// const BackCompo = styled(Backcomponents)`
//   margin-top: 10px;
//   margin-bottom: 10px;
// `

const Block = styled("div")`
  margin-top: 0.4rem;
`;
const Content = styled("div")`
  display: flex;
  justify-content: left;
  /* margin-left: 20px; */
  @media only screen and (min-width: 360px) {
    margin-left: 2.5rem;
  }
`;
const ImageBlock = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (min-width: 360px) {
    width: 415px;
  }
  @media screen and (min-width: 500px) {
    width: 450px;
  }
  @media screen and (min-width: 700px) {
    width: 450px;
  }
  img {
    max-width: 100%;
    @media screen and (min-width: 700px) {
      margin-top: 15px;
    }
  }
`;

const PeopleIcon = styled(EmojiPeopleRoundedIcon)`
  color: #98c064;
  margin-right: 5px;
  margin-left: 5px;
`;
const PointIcon = styled(MonetizationOnRoundedIcon)`
  color: #98c064;
  margin-right: 5px;
  margin-left: 5px;
`;
const CalendarIcon = styled(CalendarMonthRoundedIcon)`
  color: #98c064;
  margin-right: 5px;
  margin-left: 5px;
`;
const TitleText = styled("a")`
  font-size: x-large;
  font-weight: bold;
`;
const ContentText = styled("a")`
  font-size: medium;
`;
const LocalIcon = styled(RoomRoundedIcon)`
  color: #98c064;
  margin-right: 5px;
  margin-left: 5px;
`;
const WebBtn = styled(ButtonFull)`
  border-radius: 12.5px;
  padding: 5px;
  color: white;
  font-size: x-small;
  margin: 3px;
`;
const BtnContent = styled("div")`
  display: flex;
  justify-content: flex-end;
  margin: 30px;
  @media only screen and (max-width: 650px) {
    display: none;
  }
  @media screen and (min-width: 700px) {
    margin-right: 3.5rem;
  }
`;

const ModalMore = styled("div")`
  z-index: 999;
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  @media only screen and (min-width: 650px) {
    display: none;
  }
`;

const LinkBtn = styled("button")`
  border: 1px solid #7fb5e4;
  background-color: #7fb5e4;
  min-width: 150px;
  color: white;
  height: 40px;
  margin: 5px;
  min-width: 150px;
  border-radius: 15px;
  :hover {
    cursor: pointer;
  }
`;

const DeleteBtn = styled(LinkBtn)`
  border: 1px solid coral;
  background-color: coral;
  min-width: 150px;
`;

const ModifyBtn = styled(LinkBtn)`
  min-width: 150px;
`;

const Div = styled("div")`
  margin-left: auto;
  margin-right: 15px;
  position: fixed;
  right: 1%;
  top: 15%;
  display: flex;
  flex-direction: column;
  @media only screen and (max-height: 668px) {
    top: 17%;
  }
`;

const BorderHeart = styled(FavoriteBorderRoundedIcon)`
  color: coral;
  font-size: xx-large;
  :hover {
    cursor: pointer;
  }
`;
const FullHeart = styled(FavoriteRoundedIcon)`
  color: coral;
  font-size: xx-large;
  :hover {
    cursor: pointer;
  }
`;

const LikeBtn = styled("div")`
  display: flex;
`;

const TtitleContent = styled("div")`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem;
  @media only screen and (min-width: 360px) {
    margin-left: 2.5rem;
    margin-right: 2.5rem;
  }
`;
const LikeAndJoinWrapper = styled("header")`
  display: flex;
  justify-content: center;
  position: fixed;
  left: 10%;
  right: 10%;
  bottom: 13%;
  @media only screen and (min-width: 650px) {
    bottom: 5%;
  }
`;

const JoinBorderBtn = styled(ButtonBorder)`
  width: 250px;
  font-size: medium;
`;
const JoinFullBtn = styled(ButtonFull)`
  width: 250px;
  font-size: medium;
`;
const JoinDiv = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LikeDiv = styled("div")`
  margin-right: 15px;
  background-color: white;
  border: 1px solid coral;
  border-radius: 10px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UnderLine = styled("hr")`
  margin: 30px;
  width: 80%;
`;
const MissionExplanation = styled("div")`
  display: flex;
`;
//네브바
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
const Title = styled("div")`
  display: flex;
  align-items: center;
  @media only screen and (min-width: 650px) {
    display: none;
  }
`;
const PageTitle = styled("span")`
  font-weight: bold;
  font-size: 15px;
  color: #555555;
  margin-left: 10px;
`;
const BackButton = styled(ArrowBackIosRoundedIcon)`
  color: #98c064;
  :hover {
    cursor: pointer;
  }
`;

const HiDetail = styled("div")`
  display: flex;
  justify-content: center;
`;
interface PageName {
  name: string;
}

function Back({ name }: PageName) {
  const router = useRouter();
  return (
    <Title className="BackTitle">
      <BackButton
        onClick={() => {
          router.back();
        }}
      />
      <PageTitle>{name}</PageTitle>
    </Title>
  );
}
//미션 올린 사람 x 모바일 뷰 더보기 모달창
function MissionUnAuthModal() {
  const copyURL = () => {
    let currentUrl = window.document.location.href;
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);

    alert("링크가 복사되었습니다.");
  };
  return (
    <Div>
      {/* 클릭 시 링크 복사하는 기능 추가 */}
      <LinkBtn
        onClick={() => {
          copyURL();
        }}
      >
        링크 복사하기
      </LinkBtn>
    </Div>
  );
}

//미션 올린 사람일 경우 모바일 뷰 더보기 모달창
function MissionAuthModal() {
  return (
    <Div>
      {/* 클릭 시 임무 수정 페이지로 이동하는 기능 추가 */}
      <ModifyBtn>임무 내용 수정하기</ModifyBtn>
      {/* 클릭 시 임무 삭제하는 기능 추가 */}
      <DeleteBtn>임무 삭제하기</DeleteBtn>
    </Div>
  );
}

//좋아요 참여중 표시
function MobileLikeAndJoin() {
  const [join, setJoin] = useState(false);
  const [like, setLike] = useState(false);
  return (
    <>
      <LikeAndJoinWrapper>
        <LikeDiv>
          <LikeBtn onClick={() => setLike(!like)}>
            {like === false ? <BorderHeart /> : <FullHeart />}
          </LikeBtn>
        </LikeDiv>
        <JoinDiv onClick={() => setJoin(!join)}>
          {join === false ? (
            <JoinFullBtn hColor={"#98C064"} dColor={"#65ACE2"}>
              참여중인 임무입니다
            </JoinFullBtn>
          ) : (
            <JoinBorderBtn dColor={"#65ACE2"}>임무에 참여하기</JoinBorderBtn>
          )}
        </JoinDiv>
      </LikeAndJoinWrapper>
    </>
  );
}

export default function MissionDetail() {
  const router = useRouter();


  // const [use, setUserId] = useRecoilState(userId)
  // if (typeof window === "undefined"){
  //   const userId = JSON.parse(localStorage.getItem('recoil-persist')).userId

  // }


  const { data: MissionDetail } = useQuery(["missions"],  () => {
    missionUserData(missionId, userId);
  });

  const missionId = router.query.id;


  const [ModalAuth, setModalAuth] = useState(false);
  const [Auth, setAuth] = useState(false);
  const [unAuth, setUnAuth] = useState(false);
  

  return (
    <>
      <HiDetail>
        {/* 헤더 */}
        <Head>
          <title>임무상세 | 지구-방위대</title>
        </Head>

        <NavBar>
          <Header>
            {/* 모바일 뷰에서 뒤로가기 버튼! */}
            <Back name="임무 상세보기"></Back>
            {/* 모바일 뷰에서 모달창 */}

            {/* Modal창을 열기 위한 땡땡이*/}
            {/* 게시글 작성자 판별  */}
            {ModalAuth === true ? (
              <MobileMore onClick={() => setAuth(!Auth)} />
            ) : (
              <MobileMore onClick={() => setUnAuth(!unAuth)} />
            )}
          </Header>
        </NavBar>

        {/* Modal창 */}
        <ModalMore>
          {/* 작성자일 떄 */}
          {Auth === true ? <MissionAuthModal /> : null}
          {/* 작성자 아닐 때 */}
          {unAuth === true ? <MissionUnAuthModal /> : null}
        </ModalMore>

        <DetailWrapper>
          {/* 미션이미지 */}
          <ImageBlock>
            <img src={MissionDetail?.repImageURL} />
          </ImageBlock>

          {/* 임무타이틀 */}
          <Block>
            <TtitleContent>
              <TitleText>{MissionDetail?.title}</TitleText>
            </TtitleContent>
          </Block>

          {/* 참여자수/정원 */}
          <Block>
            <Content>
              <PeopleIcon />
              <ContentText>
                {MissionDetail?.nowPerson} / {MissionDetail?.maxPerson} 명
              </ContentText>
            </Content>
          </Block>

          {/* 포인트 */}
          <Block>
            <Content>
              <PointIcon />
              <ContentText>+{MissionDetail?.entryPoint}P</ContentText>
            </Content>
          </Block>

          {/* 활동기간 */}
          <Block>
            <Content>
              <CalendarIcon />
              <ContentText>
                {MissionDetail?.startDate}~ {MissionDetail?.endDate}
              </ContentText>
            </Content>
          </Block>

          {/* 미션장소 */}
          <Block>
            <Content>
              <LocalIcon />
              <ContentText>
                {MissionDetail?.sidoCode} {MissionDetail?.gugunCode}
              </ContentText>
            </Content>
          </Block>

          <Block>
            <Content>
              <UnderLine />
            </Content>
          </Block>

          {/* api 추가 생성 후 미션 소개...추가 해주세요... */}
          <Block>
            <Content>
              <MissionExplanation>
                안녕하세요 임시입니다
                <br />
                여기에 api 추가되면 넣어야 해요!
                <br></br>
                프로젝트 화이티이이잉!
              </MissionExplanation>
            </Content>
          </Block>

          {/* 로그인 시 웹 뷰에서 수정 삭제 버튼 */}
          <Block>
            <BtnContent>
              <WebBtn
                dColor={"#98C064"}
                hColor={"#65ACE2"}
                //임시 라우터
                onClick={() => router.push("/mission/createmission")}
              >
                수정
              </WebBtn>

              <WebBtn
                hColor={"#98C064"}
                dColor={"#65ACE2"}
                //임시 라우터
                onClick={() => router.push("/mission/createmission")}
              >
                삭제
              </WebBtn>
            </BtnContent>
          </Block>
        </DetailWrapper>

        {/* 모바일뷰 좋아요 참여하기 참여중 표시 */}
        <MobileLikeAndJoin />
      </HiDetail>
    </>
  );
}

// export async function getServerSideProps(context) {

//     const missiondetail = new QueryClient()
//     // const [id, setId]= useRecoilValueLoadable(userId)
//     // console.log(userId)
//     await missiondetail.prefetchQuery(['missions'], () => { missionUserData() })

//     return {
//         props: {
//             data: {

//                 dehydratedState: dehydrate(missiondetail)
//             },
//         },
//     };

// }
