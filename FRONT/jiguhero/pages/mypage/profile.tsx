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

const UploadButton = styled("div")<{ dColor: string }>`
  border: ${(props) => props.dColor} solid 1px;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
  color: ${(props) => props.dColor};
  :hover,
  .active {
    color: white;
    background-color: ${(props) => props.dColor};
    cursor: pointer;
  }
`;

const Filename = styled("input")`
  display: none;
`;
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
const PfForm = styled("form")``;

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
    <EntireContainer>
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
      <label htmlFor="image">
        {/* 프로필 사진 변경 버튼 */}
        <UploadButton dColor={"#65ACE2"}>프로필 사진 변경</UploadButton>
      </label>
      {/* 사진 업로드 인풋 */}
      <Filename
        type="file"
        accept="image/*"
        name="file"
        id="image"
        onChange={changeHandler}
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
        />
        {/* 닉네임 변경 버튼 */}
        <ButtonFull dColor={"#98C064"} hColor={"#65ACE2"} type="submit">
          닉네임 변경
        </ButtonFull>
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
        dColor={"#FF4F4F"}
        hColor={"#FF4F4F"}
        onClick={(event) => {
          event.preventDefault();
          deleteNickname(data.session.user.userId);
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
