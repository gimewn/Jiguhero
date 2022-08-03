import Head from "next/head"
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import styled from "styled-components"
import { useRouter } from 'next/router';
import { ButtonFull } from 'styles/styled';
import ConfirmValidationInput from "../components/validationInput";
import regex from "../components/regex";


export default function User() {
  const router = useRouter();
  const [nickInput, setNickInput] = useState("");
  const [isCheck, setIsCheck] = useState(false);
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
          <input hidden accept="image/*" type="file" />
          <CameraBox>
            <PhotoCamera fontSize="large" />
          </CameraBox>
        </IconButton>
      </CameraBtn>

      {/* 대원명 입력 및 중복확인*/}

      <ConfirmValidationInput
        value={nickInput}
        setValue={setNickInput}
        maxValue={16}
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        handleValueCheck={() => {
          alert("인증완료!");
          setIsCheck(true);
        }}
        regexCheck={regex.nickname}
        defaultText="필수!"
        successText="Good!"
        errorText="15자 이내로 작성해주세요!"
      />


      {/* 가입완료 버튼 */}
      <ButtonStack>
        <ButtonFull
          hColor={'#98C064'}
          dColor={'#65ACE2'}
          variant="contained"
          onClick={() => router.push("/")} >가입완료</ButtonFull>
      </ButtonStack>
    </SignUpWrapper >


  );
};



//styled-components
const SignUpWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const SignUpText = styled('h1')`
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.8rem;
`
const CameraBox = styled('form')`
  width: 150px;
  height: 150px;
  background-color: #FFffff;
  border-radius: 100px;
  box-shadow: 0px 0px 5px 0px #dadce0 inset;
  border: 0;
  display:flex;
  justify-content: center;
  align-items: center;
  svg {

  }
`
const CameraBtn = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`

const ButtonStack = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
`



