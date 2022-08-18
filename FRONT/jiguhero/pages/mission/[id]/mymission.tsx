import styled from "styled-components";
import { ButtonFull, ButtonBorder, ParentsDiv } from "styles/styled";
import Backcomponents from "components/back";
import MissionModal from "components/MissionModal";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  allauthImgList,
  missionTabpage,
  myauthImgList,
  otherauthImgList,
} from "states/mission";
import {
  RecoilState,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import getDetail from "pages/api/mission/getDetail";
import getDong from "pages/api/ecomarket/getDong";
import getPercent from "pages/api/mission/getPercent";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PostMissionauthImg from "pages/api/mission/postmissionauthImg";
import PostMissionauthtext from "pages/api/mission/postMissionauthtext";
import { UserId } from "states/user";

const Div = styled("div")`
  padding: 18px;
`;

const List = styled("div")`
  border: 1px solid #98c064;
  border-radius: 15px;
  width: auto;
  height: auto;
  display: flex;
  /* flex-direction: row; */
  /* align-items: center;
  justify-content: center; */
  overflow: hidden;
  margin: 5px;
  :hover {
    cursor: pointer;
  }

  /* @media screen and (min-width: 360px){
      width:350px;
  }
  @media screen and (min-width:450px){
      width: 350px;
  }
  @media screen and (min-width: 700px) and (max-width:1400){
      width:800px;
  } */
`;
const ListImg = styled("div")<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  width: 200px;
  @media only screen and (max-width: 650px) {
      width:150px;
  }
  @media only screen and (max-width: 450px) {
      width:150px;
  }
  height: 180px;
  border: 1px solid none;
  float: left;
`;
const ListContent = styled("div")`
    min-width:200px;
  width:300px;
  @media only screen and (max-width: 650px) {
      width:200px;
  }
  @media only screen and (max-width: 450px) {
      width:150px;
  }
  height: 180px;
  border: 1px solid none;
  /* float: left; */
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: center;
`;

const TextWrapper = styled("div")`
  margin-left: 15px;
  margin-right: auto;
`;

const TitleName = styled("h2")`
  font-size: 18px;
  font-weight: bolder;
  margin: 0;
`;
const Name = styled("p")`
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 0;
`;
const Date = styled(Name)``;
const JoinPeople = styled(Name)``;
const PointBtn = styled("div")`
  border-radius: 12.5px;
  padding: 5px;
  border: 1px solid #98c064;
  background-color: #98c064;
  color: white;
  font-size: 13px;
  margin-left: auto;
  margin-right: 15px;
`;
const ListWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ButtonWrapper = styled("div")`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const AchieveFullBtn = styled(ButtonFull)`
  font-size: medium;
  border-radius: 10px;
  padding: 3px 10px;
  margin: 10px;
  /* text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black; */
  :hover {
    cursor: pointer;
  }
`;

const CertifyFullBtn = styled(AchieveFullBtn)``;
const AchieveBorderBtn = styled(ButtonBorder)`
  font-size: medium;
  border-radius: 10px;
  padding: 3px 10px;
  :hover {
    cursor: pointer;
  }
`;
const CertifyBorderBtn = styled(AchieveBorderBtn)``;

const AchieveWrapper = styled("div")`
  display: flex;
  justify-content: center;
  /* max-width: 500px; */
`;
const ProgressWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;
const CertifyWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CertifyGoBtn = styled(ButtonFull)`
  padding: 3px 10px;
  border-radius: 10px;
  margin-left: 140px;
  margin-right: 25px;
`;
const Text = styled("a")`
  font-size: 15px;
  font-weight: bolder;
  margin-left: 25px;
  margin-right: 25px;
`;
const Text2 = styled("a")`
  font-size: 13px;
  margin-left: 4rem;
  margin-right: 1rem;
`;

//진행률바 라이브러리 이용
const Progress = styled(ProgressBar)`
  max-width: 350px;
  width: 90%;
  span * {
    color:#252525;
  }
`;

const CertifyFeed = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 500px;
  @media only screen and (max-width: 650px) {
      width:350px;
  }
  @media only screen and (max-width: 450px) {
      width:300px;
  } */
`;

const Text3 = styled("a")`
  font-size: large;
  font-weight: bolder;
  background-color: #fcfca886;
`;

const HeroTextWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NoHeroText1 = styled("a")`
  font-family: PyeongChangPeace-Bold;
  font-size: 100px;
  padding: 50px 0 0 0;
`;
const NoHeroText2 = styled("a")`
  font-size: medium;
  font-weight: bold;
`;

const BottomDiv = styled("div")`
  margin-bottom: 70px;
`;

const ModalDiv = styled("div")`
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 15%;
  width: 85%;
  max-width: 500px;
  border: 0;
  border-radius: 20px;
  z-index: 998;
  max-height: 100%;
  /* bottom:5%; */
  overflow: auto;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;
const ModalHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 20px 20px 0px 25px;
`;
const HeaderTitle = styled("span")`
  font-size: 1.5rem;
  font-weight: bold;
  padding: auto;
`;
const CloseBtn = styled(CloseRoundedIcon)`
  color: #65ace2;
`;

const ModalBody = styled("div")`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding: 5px 20px 0px 25px;
  @media only screen and (max-width: 650px) {
    padding: 0 20px 0px 20px;
  }
  .inputBtn {
    margin-left: auto;
    margin-right: 8px;
  }
`;

const CameraBox = styled("div")`
  width: 250px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 0px 5px 0px #dadce0 inset;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 360px) {
    width: 200px;
    height: 150px;
  }
  img {
    width: 250px;
    height: 200px;
    border-radius: 15px;
  }
`;

const MissionText = styled("textarea")`
  border: #65ace2 solid 2px;
  background-color: white;
  border-radius: 15px;
  width: 300px;
  height: 100px;
  margin: 20px;
`;

const MissionBtn = styled(ButtonFull)`
  padding: 3px 10px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const ModalBack = styled("div")`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 997;
  backdrop-filter: blur(5px);
  height: 100vh;
  width: 100%;
  overflow: hidden;
  top: 0%;
`;

interface MissionProps {
  entryPoint: number;
  title: string;
  startDate: number;
  endDate: number;
  sidoCode: string;
  nowPerson: number;
  maxPerson: number;
  repImageURL: string;
  missionId: number;
}

// interface MissionProps {
//   entryPoint: number;
//   title: string;
//   startDate: number;
//   endDate: number;
//   sidoCode: string;
//   nowPerson: number;
//   maxPerson: number;
//   repImageURL: string;
//   missionId: number;
// }

//내가 참여중인 미션 보여주는 함수
// function NowMission() {
//   const router = useRouter();
//   return (
//     <List onClick={() => router.push(`1`)}>
//       {/* <ListImg image={repImageURL} /> */}
//       <ListImg />
//       <ListContent>
//         <TextWrapper>
//           <TitleName>제목</TitleName>
//           <Name>지역</Name>
//           <Date>시작 날짜~끝 날짜</Date>
//           <JoinPeople>1 / 5명</JoinPeople>
//         </TextWrapper>
//         {/* </div> */}
//         <PointBtn>+200</PointBtn>
//       </ListContent>
//     </List>
//   );
// }

//달성률 & 인증샷 버튼 그룹
function ButtonGroup() {
  // 탭 전환
  const tab = useRecoilValue(missionTabpage);
  const setTab = useSetRecoilState(missionTabpage);

  //달성률 버튼 클릭하면 연두색 인증샷 버튼 클릭하면 하얀색!
  const [tabColor, setTabColor] = useState(true);

  return (
    <>
      {/* 탭 전환을 위한 버튼들 */}
      <ButtonWrapper>
        {tabColor ? (
          <AchieveFullBtn
            dColor={"#98C064"}
            hColor={"98C064"}
            onClick={() => {
              setTab(true), setTabColor(!tabColor);
            }}
          >
            달성률
          </AchieveFullBtn>
        ) : (
          <AchieveBorderBtn
            dColor={"#65ACE2"}
            onClick={() => {
              setTab(true), setTabColor(!tabColor);
            }}
          >
            달성률
          </AchieveBorderBtn>
        )}
        {tabColor ? (
          <CertifyBorderBtn
            dColor={" #65ACE2"}
            onClick={() => {
              setTab(false), setTabColor(!tabColor);
            }}
          >
            인증샷
          </CertifyBorderBtn>
        ) : (
          <CertifyFullBtn
            dColor={"#98C064"}
            hColor={"98C064"}
            onClick={() => {
              setTab(false), setTabColor(!tabColor);
            }}
          >
            인증샷
          </CertifyFullBtn>
        )}
      </ButtonWrapper>

    </>
  );
}

export default function MyMissionFeed() {
  const router = useRouter();
  const missionId = router.query.id;
  const tab = useRecoilValue(missionTabpage);
  const setTab = useSetRecoilState(missionTabpage);
  const [Modal, setModal] = useState(false);
  // const [missionItem, setMissionItem] = useState();
  const [region, setRegion] = useState();
  // const [userId, setUserId] = useState<number>();
  // const [myImg, setMyImg] = useState([]);
  // const [otherImg, setOtherImg] = useState([]);
  const [percent, setPercent] = useState<number>(0);
  const [createImg, setCreateimg] = useState<File>(null); // 모달 이미지 파일
  const [preview, setPreview] = useState<string>(); // 이미지 미리보기 사진
  const [textarea, setTextarea] = useState<string>(); // 모달 텍스트
  const [userId, setUserId] = useRecoilState(UserId);
  const [missionItem, setMissionItem] = useRecoilState(allauthImgList);
  const [myImg, setMyImg] = useRecoilState(myauthImgList);
  const [otherImg, setOtherImg] = useRecoilState(otherauthImgList);

  useEffect(() => {
    if (createImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(createImg);
    } else {
      setPreview(null);
    }
  }, [createImg]);

  useEffect(() => {
   
    setUserId(userId);
    if (missionId) {
      getDetail(router.query.id, 1).then((res) => {
        setMissionItem(res);
        console.log(res);
        // setTestList(res)
        setMyImg(
          res.imageURL.filter((data) => {
            if (data[2] === userId) {
              return data;
            }
          })
        );

        setOtherImg(
          res.imageURL.filter((data) => {
            if (data[2] !== userId) {
              return data;
            }
          })
        );

        getDong(res.gugunCode).then((item) => {
          const result = item.filter((dong) => {
            if (dong.dongCode === res.dongCode) {
              setRegion(dong.dongName);
              return dong;
            }
          });
        });
      });
      getPercent(missionId, userId).then((res) => {
        setPercent(res);
      });
    }
  }, []);



  useEffect(() => {
    if (Modal === false) {
    } else {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [Modal]);
  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setCreateimg(e.target.files[0]);
    } else {
      setCreateimg(null);
    }
  };

  console.log(percent);
  //달성률 버튼 클릭하면 연두색 인증샷 버튼 클릭하면 하얀색!
  const [tabColor, setTabColor] = useState(true);
  return (
    <ParentsDiv>
      {/* 헤더 */}
      <Head>
        <title>나의 임무 | 지구-방위대</title>
      </Head>
      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <Backcomponents name="나의 임무"></Backcomponents>

      <Div></Div>
      {/* 참여중인 미션 보여줌! */}
      <ListWrapper>
        <List onClick={() => router.push(`/mission/${router.query.id}`)}>
          {/* <ListImg image={repImageURL} /> */}
          {missionItem ? (
            <>
              <ListImg image={missionItem.repImageURL} />
              <ListContent>
                <div style={{marginLeft:'0', marginRight:'auto'}}>
                  <TextWrapper>
                    <TitleName>{missionItem.title}</TitleName>
                  </TextWrapper>
                  {region ? (
                    <>
                      <TextWrapper>
                        <Name>{region}</Name>
                      </TextWrapper>
                    </>
                  ) : (
                    <></>
                  )}
                  <TextWrapper>
                    <Date>
                      {missionItem.startDate}~{missionItem.endDate}
                    </Date>
                  </TextWrapper>
                  <TextWrapper>
                    <JoinPeople>
                      {missionItem.nowPerson} / {missionItem.maxPerson}명
                    </JoinPeople>
                  </TextWrapper>
                </div>
                <PointBtn>+{missionItem.entryPoint}</PointBtn>
              </ListContent>
            </>
          ) : (
            <></>
          )}
        </List>
      </ListWrapper>

      {/* 달성률 인증샷 탭 */}
      {/* 탭 전환을 위한 버튼들 */}
      <ButtonWrapper>
        {tabColor ? (
          <AchieveFullBtn
            dColor={"#98C064"}
            hColor={"98C064"}
            onClick={() => {
              setTab(true), setTabColor(!tabColor);
            }}
          >
            달성률
          </AchieveFullBtn>
        ) : (
          <AchieveBorderBtn
            dColor={"#65ACE2"}
            onClick={() => {
              setTab(true), setTabColor(!tabColor);
            }}
          >
            달성률
          </AchieveBorderBtn>
        )}
        {tabColor ? (
          <CertifyBorderBtn
            dColor={" #65ACE2"}
            onClick={() => {
              setTab(false), setTabColor(!tabColor);
            }}
          >
            인증샷
          </CertifyBorderBtn>
        ) : (
          <CertifyFullBtn
            dColor={"#98C064"}
            hColor={"98C064"}
            onClick={() => {
              setTab(false), setTabColor(!tabColor);
            }}
          >
            인증샷
          </CertifyFullBtn>
        )}
      </ButtonWrapper>
      {tab ? (
        <>
          <AchieveWrapper>
            <Text>달성률</Text>
          </AchieveWrapper>

          <ProgressWrapper>
            <Progress completed={percent} bgColor={"#65ACE2"} />
          </ProgressWrapper>

          <CertifyWrapper>
            <Text>나의 인증샷</Text>
            <CertifyGoBtn
              hColor={"#65ACE2"}
              dColor={"#98C064"}
              onClick={() => setModal(true)}
            >
              인증하기
            </CertifyGoBtn>
            {Modal && (
              <>
                <ModalDiv>
                  <ModalHeader>
                    <HeaderTitle>📸인증해보아요</HeaderTitle>
                    <CloseBtn onClick={() => setModal(false)} />
                  </ModalHeader>
                  <ModalBody>
                    <IconButton aria-label="upload picture" component="label">
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        name="file"
                        onChange={changeHandler}
                      />
                      {createImg ? (
                        <CameraBox>
                          <img src={preview} />
                        </CameraBox>
                      ) : (
                        <CameraBox>
                          <PhotoCamera fontSize="large" />
                        </CameraBox>
                      )}
                    </IconButton>

                    <MissionText
                      onChange={(e) => {
                        setTextarea(e.target.value);
                      }}
                      placeholder="문구를 입력해 주세요!"
                    ></MissionText>

                    <div className="inputBtn">
                      <MissionBtn
                        dColor="#98C064"
                        hColor="#65ACE2"
                        onClick={async (e) => {
                          const imageId = await PostMissionauthImg(
                            createImg,
                            missionId,
                            userId
                          );
                          console.log(imageId);
                          PostMissionauthtext(
                            textarea,
                            missionId,
                            userId,
                            imageId
                          ).then(res=>{
                            console.log(res)
                          })
                          setPreview("");
                          setModal(false);
                          getDetail(router.query.id, 1).then((res) => {
                            setMyImg(
                              res.imageURL.filter((data) => {
                                if (data[2] === userId) {
                                  return data;
                                }
                              })
                            );
                          });
                        }}
                      >
                        등록하기
                      </MissionBtn>
                    </div>
                  </ModalBody>
                </ModalDiv>
                <ModalBack onClick={() => setModal(false)} />
              </>
            )}
          </CertifyWrapper>
          <>
            {myImg ? (
              <CertifyFeed>
                <ImageList sx={{ width: 500, height:500}} cols={3} rowHeight={130}>
                  {myImg.map((item, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={`${item[1]}&w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item[1]}&w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        loading="lazy"
                        onClick={() => {
                          router.push(`/mission/${missionId}/missionfeed`);
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </CertifyFeed>
            ) : null}
          </>
        </>
      ) : (
        <>
          <HeroTextWrapper>
            <Text3>📸대원들의 인증샷</Text3>
          </HeroTextWrapper>

          {otherImg ? (
            <CertifyFeed>
              <ImageList sx={{ width: 350 }} cols={3} rowHeight={130}>
                {otherImg.map((item, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={`${item[1]}&w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item[1]}&w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      loading="lazy"
                      onClick={() => {
                        router.push(`/mission/${missionId}/missionfeed`);
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </CertifyFeed>
          ) : (
            <HeroTextWrapper>
              <NoHeroText1>앗!</NoHeroText1>
              <NoHeroText2>아직 인증한 대원이 없어요😥</NoHeroText2>
            </HeroTextWrapper>
          )}
        </>
      )}
    </ParentsDiv>
  );
}
