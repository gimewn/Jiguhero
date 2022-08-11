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
import imgUpload from "pages/api/user/imgUpload";
import sameNickname from "pages/api/user/sameNickname";
import updateNickname from "pages/api/user/updateNickname";
import deleteNickname from "pages/api/user/deleteAccount";

const BgImg = styled("div")`
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
`;

const UploadButton = styled("div")`
    border: ${(props) => props.dColor} solid 1px;
    background-color: white;
    border-radius: 15px;
    padding:10px;
    color:${(props) => props.dColor};
    :hover, .active{
        color:white;
        background-color: ${(props) => props.dColor};
        cursor: pointer;
    }
`;

const Filename = styled("input")`
  display: none;
`;

const PfForm = styled("form")``;

interface Update {
  username: string;
}

export default function Profile({ data }) {

  const [pfimg, setPfimg] = useState();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Update>({
    mode: "onBlur",
  });
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
    <EntireContainer>
         {/*  사진  */}
      <BgImg>
        <img alt="nitz" src={`${pfimg}`} />
      </BgImg>
      <label htmlFor="image">
        {/* 프로필 사진 변경 버튼 */}
        <UploadButton dColor={"#65ACE2"} >
          프로필 사진 변경
        </UploadButton>
      </label>
      {/* 사진 업로드 인풋 */}
      <Filename
        type="file"
        accept=".img, .png, .jpeg, .jpg"
        name="file"
        id="image"
        onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
          e.preventDefault();
          // const res = setPfimg(e.target.files[0], data.session.user.userId);
        }}
      />
      
      <PfForm onSubmit={handleSubmit(onValid, onInvalid)}>
        {/* 닉네임 작성 인풋 */}
        <input
          {...register("username", {
            required: "닉네임을 작성해주세요",
            maxLength: {
              message: "최대 15자 이내로 작성해주세요.",
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
          onChange={() => {}}
        />
        {/* 닉네임 변경 버튼 */}
        <ButtonFull dColor={"#98C064"} hColor={"#65ACE2"} type="submit">닉네임 변경</ButtonFull>
      </PfForm>
      {/* 닉네임 유효성 검사 오류 시 메세지 */}
      <p>{errors.username?.message}</p>
      {/* 나머지 메세지 */}
      {/* <h4>{data.session.user.name}님, 저희와 함께 지구를 지켜주세요! </h4> */}
      <p>
        친환경, 혼자 실천하기 힘들지 않으셨나요? 다른 대원들과 함께라면 친환경
        실천이 훨씬 더 재밌고 쉬워질 거예요! 그래도 정말 떠나셔야 한다면...🥲
      </p>
      {/* 회원탈퇴 버튼 */}
      <ButtonFull
        Color={"#FF4F4F"}
        hColor={"#FF4F4F"}
        onClick={(event) => {
          event.preventDefault()
          deleteNickname(data.session.user.userId)
        }}
      >
        방위대 탈퇴하기
      </ButtonFull>
    </EntireContainer>
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
    missionUserData(context);
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
