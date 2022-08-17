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
import signinUserNickname from "../api/user/signinUserNickname";
import { UserName } from "states/user";
// import ConfirmValidationInput from "../components/validationInput";
// import regex from "../components/regex";
import { ParentsDiv } from 'styles/styled'
import Backcomponents from 'components/back';

export default function User() {
  const router = useRouter();
  const [userName, setUserName] = useRecoilState(UserName)
  const [userImg, setUserImg] = useState<File>(); // 이미지 파일
  const [preview, setPreview] = useState<string>(); // 이미지 미리보기 사진
  const [nickInput, setNickInput] = useState("");
  const [isCheck, setIsCheck] = useState(0);
  const [checkWord, setCheckword] = useState("");
  const userId = router.query.id;

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
    <ParentsDiv>
      {/* header추가 */}
      <Head>
        <title>회원가입 | 지구-방위대</title>
      </Head>
      {/* 방위대 소식 back버튼 */}
      <Backcomponents name='회원가입'></Backcomponents>

      <NewsTop>
        <H2>🦸🏻 회원가입</H2>
      </NewsTop>


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
          required={true}
          maxLength={15}
          placeholder="대원명을 입력해주세요!"
        />
        <NicknameB
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
        </NicknameB>
      </Nick>
      {/* 유효성 검사 결과 텍스트 */}
      <CheckMessage><a>{checkWord ? checkWord : null}</a></CheckMessage>




      {/* 가입완료 버튼 */}
      <ButtonStack>
        {isCheck ? (
          <SignUpDone
            dColor={"#ff7f50"}
            hColor={"#f86f3d"}
            onClick={() => {
              signinUserImg(userImg, userId);
              const data = await signinUserNickname(nickInput, userId);
              setUserName(data.nickname)
              router.push("/");
            }}
          >
            가입완료
          </SignUpDone>
        ) : (
          <SignUpDone hColor={"#949693"} dColor={"#949693"} disabled>
            가입완료
          </SignUpDone>
        )}
      </ButtonStack>
    </ParentsDiv>
  );
}

//styled-components
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

const CheckMessage = styled('div')`
  display: flex;
  margin-left: 6rem;
  @media only screen and (max-width: 650px) {
        margin-left:2rem;
    }
  a{
  font-size: small;
  font-weight: bold;
  color: #65ACE2;
  }
`


const NicknameB = styled(ButtonFull)`
    font-size: small;
    border-radius: 10px;
    padding: 5px 10px;
    margin-left: 10px;
    `
const Nick = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  input{
  width: 60%;
  border-radius: 10px;
  border: 1px solid #65ACE2;
  padding: 5px;
  }
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
  margin: 4.5rem 2rem 3rem 2rem;
`;

const ButtonStack = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
`;

const SignUpDone = styled(ButtonFull)`
  width:60%;
`