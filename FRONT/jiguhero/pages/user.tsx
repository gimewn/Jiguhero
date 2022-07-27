import Head from "next/head"
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import styled from "styled-components"
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: [
      'PyeongChang',
    ].join(','),
  },
});

const SignUpWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SignUpText = styled('h1')`
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`
const CameraBox = styled('div')`
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
const CheckButton = styled(Button)`
  background-color: #65ACE2;
  margin-left: 3rem;
  :hover{
    background-color: #4aa0e2;
  }
`
const SignUpButton = styled(Button)`
  background-color: #98C064;
  :hover{
    background-color: #77ab32;
  }
`

const SignUpStack = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const HeroTextField = styled(TextField)`
  width: 25vw;
  height: 7rem;
  :hover{
    color: #4aa0e2;
  }
`




export default function User() {
  const router = useRouter();
  const [nicknameError, setNicknameError] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);

  //   const joinData = {
  //     nickname: data.get('nickname'),
  //   };

  //   // 닉네임 유효성 검사
  //   const nameRegex = /^[가-힣a-zA-Z]+$/;
  //   if (!nameRegex.test(nickname) || name.length < 1) setNameError('올바른 이름을 입력해주세요.');
  //   else setNameError('');



  return (
    <ThemeProvider theme={theme}>
      <SignUpWrapper>
        {/* header추가 */}
        <Head>
          <title>회원가입 | 지구-방위대</title>
        </Head>
        <main>
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

          {/* 대원명 입력 */}
          <div>
            <Box>
              <HeroTextField
                id="nickname"
                label="사용하실 대원명을 입력해주세요"
                required
                variant="standard"
                inputProps={{
                  maxLength: 15,
                }}
                helperText="15자 이내로 작성해 주세요!"
              />
              <CheckButton variant="contained" type='submit'>중복확인</CheckButton>
            </Box>
            {/* <TextField error helperText="10자 이내로 작성해 주세요!" /> */}
            <SignUpStack direction="row">
              <SignUpButton variant="contained" onClick={() => router.push("/")} >가입완료</SignUpButton>
            </SignUpStack>
          </div>
        </main>
      </SignUpWrapper>
    </ThemeProvider>

  );
};


