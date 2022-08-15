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
import { ParentsDiv } from 'styles/styled'
import Backcomponents from 'components/back';
import Head from 'next/head';



const CameraBtn = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

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
const PfForm = styled("form")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

`;
const NicknameB = styled(ButtonFull)`
    font-size: small;
    border-radius: 10px;
    padding: 3px 10px;
    margin-left: 10px;
    `
const ResignB = styled(NicknameB)`
  @media only screen and (max-width: 650px) {
      margin-top: 10px;
       margin-left: 0px;
    }
`

const H2 = styled('h2')`
  @media only screen and (max-width: 650px) {
    display:none;
  }
`
const NewsTop = styled('div')`
    margin-left:35px;
    @media only screen and (max-width: 650px) {
        margin-top:20px;
    }
`

const NickNmaeInput = styled('input')`
  width: 50%;
  border-radius: 10px;
  border: 1px solid #65ACE2;
  padding: 3px;
  
`

const ErrorMessage = styled('a')`
  font-size: x-small;
  font-weight: bold;
  color: coral;
  @media only screen and (min-width: 650px) {
        font-size: small;
    }

`
const Div = styled('div')`
  display: flex;
  justify-content: center;
  margin-right: 25%;
  @media only screen and (min-width: 650px) {
      margin-right: 10%;
    }
`

const ResignMessage = styled('p')`
    margin:35px;
      @media only screen and (max-width: 650px) {
      font-size: small;
    }
`

const ResignDiv = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`
interface Update {
  username: string;
}

export default function Profile({ data }) {
  const [userImg, setUserImg] = useState<File>(); // 이미지 파일
  const [preview, setPreview] = useState<string>(); // 이미지 미리보기 사진
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Update>({
    mode: "onBlur",
  });
  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setUserImg(e.target.files[0]);
    } else {
      setUserImg(null);
    }
  };
  const onValid = (data: Update) => {
    console.log(data);
    // updateNickname(data.username, data.session.user.userId)
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log("실패");
  };

  useEffect(() => {
    // setPfimg(data.session.user.image);
  }, []);

  return (
    <ParentsDiv>

      {/* 헤더 */}
      <Head>
        <title>내 정보 변경 | 지구-방위대</title>
      </Head>
      {/* 방위대 소식 back버튼 */}
      <Backcomponents name='내 정보 변경'></Backcomponents>

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
      </CameraBtn>

      <PfForm onSubmit={handleSubmit(onValid, onInvalid)}>
        {/* 닉네임 작성 인풋 */}
        <NickNmaeInput
          {...register("username", {
            required: "대원명을 입력해주세요",
            maxLength: {
              message: "최대 15자 이내로 작성해주세요!",
              value: 15,
            },
            validate: {
              Nickname: (value) => {
                return sameNickname(value);
              },
            },
          })}
          type="text"
          placeholder={data}
        />
        {/* 닉네임 변경 버튼 */}
        <NicknameB dColor={"#98C064"} hColor={"#65ACE2"} type="submit">
          닉네임 변경
        </NicknameB>
      </PfForm>
      <Div>
        <ErrorMessage>{errors.username?.message}</ErrorMessage>

      </Div>
      {/* 닉네임 유효성 검사 오류 시 메세지 */}
      {/* 나머지 메세지 */}
      {/* <h4>{data.session.user.name}님, 저희와 함께 지구를 지켜주세요! </h4> */}
      <ResignDiv>
        <ResignMessage>
          친환경, 혼자 실천하기 힘들지 않으셨나요?<br />다른 대원들과 함께라면 친환경
          실천이 훨씬 더 재밌고 쉬워질 거예요!<br />그래도 정말 떠나셔야 한다면...🥲
          {/* 회원탈퇴 버튼 */}
          <ResignB
            dColor={"#FF4F4F"}
            hColor={"#FF4F4F"}
            onClick={(event) => {
              event.preventDefault();
              deleteNickname(data.session.user.userId);
            }}
          >
            방위대 탈퇴하기
          </ResignB>
        </ResignMessage>
      </ResignDiv>

    </ParentsDiv>
  );
}

export async function getServerSideProps(context) {
  const session2 = new QueryClient();
  const userInfo2 = new QueryClient();
  const missionInfo2 = new QueryClient();
  const groundInfo2 = new QueryClient();

  await userInfo2.prefetchQuery(["userInfo"], () => {
    userData();
  });
  await missionInfo2.prefetchQuery(["missionUserInfo"], () => {
    missionUserData();
  });
  await groundInfo2.prefetchQuery(["groundUserInfo"], () => {
    groundUserData(context);
  });

  return {
    props: {
      data: {
        dehydratedState: dehydrate(userInfo2),
      },
    },
  };
}
