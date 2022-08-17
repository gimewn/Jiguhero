import Head from "next/head";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import styled from "styled-components";
import { useRouter } from "next/router";
import { ButtonFull } from "styles/styled";
import { useRecoilState } from "recoil";

import signinUserImg from "pages/api/user/signinImg";
import sameNickname from "pages/api/user/sameNickname";
import signinUserNickname from "pages/api/user/signinUserNickname";
import { UserId, UserName } from "states/user";
// import ConfirmValidationInput from "../components/validationInput";
// import regex from "../components/regex";



//styled-components

const Nick = styled("div")``;

const SignUpWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpText = styled("h1")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.8rem;
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
const CameraBtn = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const ButtonStack = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
`;




export default function User() {
  const router = useRouter();
  const [userIds, setUserIds] = useRecoilState(UserId)
  const [userName, setUserName] = useRecoilState(UserName)
  const [userImg, setUserImg] = useState<File>(); // 이미지 파일
  const [preview, setPreview] = useState<string>(); // 이미지 미리보기 사진
  const [nickInput, setNickInput] = useState("");
  const [isCheck, setIsCheck] = useState(0);
  const [checkWord, setCheckword] = useState("");
  const userId = router.query.id;
	const token = router.query.token

  
  useEffect(()=>{
    console.log(token)
    localStorage.setItem('access-token',token.toString())

  }, [])

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setUserImg(e.target.files[0]);
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

  const confirmNick = async (nickname) => {
    return sameNickname(nickname);
  };

  return (
    <SignUpWrapper>
      {/* header추가 */}
      <Head>
        <title>회원가입 | 지구-방위대</title>
      </Head>

      <SignUpText>회원가입</SignUpText>

      {/* 프로필 사진 추가 */}
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

      {/* 대원명 입력 및 중복확인*/}

      <Nick>
        <input
          type="text"
          value={nickInput}
          onChange={(e) => {
            e.preventDefault();
            setNickInput(e.target.value);
            
          }}
        />
        <ButtonFull
          dColor={"#98C064"}
          hColor={"#65ACE2"}
          onClick={async (e) => {
            const valid = await sameNickname(nickInput);
            if (valid) {
              setCheckword("사용할 수 없는 닉네임 입니다");
            } else {
              setCheckword("사용가능한 닉네임 입니다");
              setIsCheck(1);
            }
          }}
        >
          중복확인
        </ButtonFull>
      </Nick>

      {/* 유효성 검사 결과 텍스트 */}
      {checkWord ? checkWord : null}

      {/* 가입완료 버튼 */}
      <ButtonStack>
        {isCheck ? (
          <ButtonFull
            hColor={"#98C064"}
            dColor={"#65ACE2"}
            onClick={async () => {
              signinUserImg(userImg, userId);
              const data = await signinUserNickname(nickInput, userId);
              setUserName(data.nickname)
              setUserIds(userId)
							
              router.push("/");
            }}
          >
            가입완료
          </ButtonFull>
        ) : (
          <ButtonFull hColor={"#949693"} dColor={"#949693"} disabled>
            가입완료
          </ButtonFull>
        )}
      </ButtonStack>
    </SignUpWrapper>
  );
}

