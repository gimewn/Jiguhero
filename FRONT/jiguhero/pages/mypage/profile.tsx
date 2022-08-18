import styled from "styled-components";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import groundUserData from "pages/api/ground/[id]";
import missionUserData from "pages/api/mission/[id]";
import userData from "pages/api/user/[id]";
import { FieldErrors, useForm } from "react-hook-form";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ButtonFull } from "styles/styled";
import { Button } from "@mui/material";
import { display } from "@mui/system";
import Image from "next/image";
import imgUpload from "pages/api/user/signinImg";
import sameNickname from "pages/api/user/sameNickname";
import updateNickname from "pages/api/user/updateNickname";
import deleteNickname from "pages/api/user/deleteAccount";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { ParentsDiv } from "styles/styled";
import Backcomponents from "components/back";
import Head from "next/head";
import UpdateUserImg from "pages/api/user/UpdateUserImg";
import { useRouter } from "next/router";

const CameraBtn = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const DontLeave = styled('div')`
  p, span{
    font-family: 'PyeongChangPeace-Bold';
    font-size: 30px;
    color:#333333;
    @media screen and (max-width: 400px){
      font-size:25px;
    }
    margin:5px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const PleaseStay = styled('div')`
  display:flex;
  flex-direction: column;
  margin:30px;
  p{
    font-size:15px;
    @media screen and (max-width: 400px){
      font-size:13px;
    }
    margin:10px;
  }
`

const CameraBox = styled("div")`
  width: 150px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 100px;
  box-shadow: 0px 0px 5px 0px #dadce0 inset;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
  }
  img {
    object-fit: cover;
    width: 150px;
    height: 150px;
    border-radius: 100px;
  }
`;
const PfDiv = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const NicknameB = styled(ButtonFull)`
  font-size: 15px;
  border-radius: 10px;
  padding: 10px 10px;
  margin-left: 10px;
`;
const ResignB = styled(NicknameB)`
  @media only screen and (max-width: 650px) {
    margin-top: 10px;
    margin-left: 0px;
  }
`;

const H2 = styled("h2")`
  @media only screen and (max-width: 650px) {
    display: none;
  }
`;
const NewsTop = styled("div")`
  margin-left: 35px;
  @media only screen and (max-width: 650px) {
    margin-top: 20px;
  }
`;

const NickNmaeInput = styled("input")`
  width: 30%;
  border-radius: 10px;
  border: 1px solid #65ace2;
  padding: 10px;
  font-size:15px;
`;

const ErrorMessage = styled("a")`
  font-size: x-small;
  font-weight: bold;
  color: coral;
  @media only screen and (min-width: 650px) {
    font-size: small;
  }
`;

const SuccessMessage = styled("a")`
  font-size: x-small;
  font-weight: bold;
  color: green;
  @media only screen and (min-width: 650px) {
    font-size: small;
  }
`;

const Div = styled("div")`
  display: flex;
  justify-content: center;
  margin-right: 25%;
  @media only screen and (min-width: 650px) {
    margin-right: 10%;
  }
`;

const ResignMessage = styled("p")`
  margin: 50px 0px 0px 0px;
  @media only screen and (max-width: 650px) {
    font-size: small;
  }
`;

const ResignDiv = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

interface Update {
  username: string;
}

export default function Profile({ data }) {
  const [userImg, setUserImg] = useState<File>(); // 이미지 파일
  const [preview, setPreview] = useState<string>(); // 이미지 미리보기 사진
  const [nickInput, setNickInput] = useState('');
  const [errormsg, setErrormsg] = useState<string>();
  const [successmsg, setSuccessmsg] = useState<string>();
  const [userId, setUserId] = useState();
  const [errorImg, setErrorImg] = useState<string>();
  const [successImg, setSuccessImg] = useState<string>();
  const router = useRouter()

  useEffect(() => {
    const usersId = JSON.parse(localStorage.getItem("recoil-persist")).userId;
    
    setUserId(usersId);
  }, []);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setUserImg(e.target.files[0])
    } else {
      setUserImg(null);
    }
  };

  useEffect(() => {
    if (userImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(userImg);
    } else {
      setPreview(null);
    }
  }, [userImg]);
  return (
    <ParentsDiv>
      {/* 헤더 */}
      <Head>
        <title>내 정보 변경 | 지구-방위대</title>
      </Head>
      {/* 방위대 소식 back버튼 */}
      <Backcomponents name="내 정보 변경"></Backcomponents>

      <NewsTop>
        <H2>🦸🏻 내 정보 변경</H2>
      </NewsTop>

      {/*  사진  */}
      <CameraBtn>
        <IconButton aria-label="upload picture" component="label">
          <input
            hidden
            accept="image/*"
            type="file"
            name="file"
            onChange={changeHandler}
          />
          {userImg ? (
            <CameraBox>
              <img src={preview} />
            </CameraBox>
          ) : (
            <CameraBox>
              <PhotoCamera fontSize="large" />
            </CameraBox>
          )}
        </IconButton>
          {userId ? 
                    <ButtonFull hColor={'#98C064'}
                    dColor={'#65ACE2'} style={{margin:'10px'}} onClick={()=>{UpdateUserImg(userImg, userId).then((res)=>{alert("프로필 사진 변경 완료")})}}>프로필 사진 변경</ButtonFull>
                : <></>}
          {/* {errorImg ? <ErrorMessage>{errorImg}</ErrorMessage>: null }
          {successImg ? <SuccessMessage>{successImg}</SuccessMessage>: null} */}
      </CameraBtn>

      {/* 닉네임 작성 인풋 */}
      <PfDiv>
        <NickNmaeInput
          type="text"
          value={nickInput}
          onChange={(e) => {
            e.preventDefault();
            setNickInput(e.target.value);
          }}
        />
        {/* 닉네임 변경 버튼 */}
        <NicknameB
          dColor={"#98C064"}
          hColor={"#65ACE2"}
          type="button"
          onClick={(e) => {
            setSuccessmsg("");
            setErrormsg("");
            if (nickInput.length > 15) {
              setErrormsg("닉네임이 15자를 넘을 수 없습니다");
            } else if (nickInput === "") {
              setErrormsg("닉네임을 작성해주세요");
            } else {
              updateNickname(nickInput,userId)
              setSuccessmsg("성공적으로 변경되었습니다");
            }
          }}
          >
          닉네임 변경
        </NicknameB>
      </PfDiv>
      <Div>
          {errormsg ? <ErrorMessage>{errormsg}</ErrorMessage> : null}
          {successmsg ? <SuccessMessage>{successmsg}</SuccessMessage> : null}
      </Div>
      {/* 닉네임 유효성 검사 오류 시 메세지 */}
      {/* 나머지 메세지 */}
      {/* <h4>{data.session.user.name}님, 저희와 함께 지구를 지켜주세요! </h4> */}
      <ResignDiv>
        <ResignMessage>
          <DontLeave>
            <p>대원님,</p>
            <p>저희와 함께</p>
            <div><span style={{color:'#98C064'}}>지구</span><span>를 지켜주세요!</span></div>
          </DontLeave>
          <PleaseStay>
          <p>친환경, 혼자 실천하기 힘들지 않으셨나요?</p>
          <p>다른 대원들과 함께라면</p>
          <p>친환경 실천이 훨씬 더 재밌고 쉬워질 거예요!</p>
          <p>그래도 정말 떠나셔야 한다면...🥺</p>
          </PleaseStay>
          </ResignMessage>
          {/* 회원탈퇴 버튼 */}
          <ResignB
            dColor={"#FF4F4F"}
            hColor={"#FF4F4F"}
            style={{marginBottom:'20px'}}
            onClick={(event) => {
              event.preventDefault();
              if(confirm("정말 탈퇴하시겠습니까?") === true){
                deleteNickname(userId);
                localStorage.removeItem('recoil-persist')
                localStorage.removeItem('access-token')
                router.push('/')
              }
            }}
          >
            방위대 탈퇴하기
          </ResignB>
      </ResignDiv>
    </ParentsDiv>
  );
}

// export async function getServerSideProps(context) {
//   const session2 = new QueryClient();
//   const userInfo2 = new QueryClient();
//   const missionInfo2 = new QueryClient();
//   const groundInfo2 = new QueryClient();

//   await userInfo2.prefetchQuery(["userInfo"], () => {
//     userData();
//   });
//   await missionInfo2.prefetchQuery(["missionUserInfo"], () => {
//     missionUserData();
//   });
//   await groundInfo2.prefetchQuery(["groundUserInfo"], () => {
//     groundUserData(context);
//   });

//   return {
//     props: {
//       data: {
//         dehydratedState: dehydrate(userInfo2),
//       },
//     },
//   };
// }
