import Head from "next/head"
import type { NextPage } from 'next'
import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import styled from "styled-components"
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: "'PyeongChang-Bold', 'PyeongChangPeace-Bold'"
  }
})

const SignUpWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CameraBtn = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
  margin-bottom: 3rem;
`
const CheckButton = styled(Button)`
  background-color: #65ACE2;
  margin-left: 3rem;
`
const SignUpButton = styled(Button)`
  background-color: #98C064;
`

const SignUpStack = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const HeroTextField = styled(TextField)`
  width: 25vw;
  height: 7rem;
`

const HeroText = styled('div')`
  text-align: center;
  margin-bottom: 3rem;
`


const User: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>

      <SignUpWrapper>
        <Head>
          <title>회원가입 | 지구-방위대</title>
        </Head>
        <main>
          <h2>회원가입</h2>

          {/* 프로필 사진 추가 */}
          <CameraBtn>
            <IconButton aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </CameraBtn>

          {/* 대원명 입력 */}
          <div>
            <HeroText>
              사용하실 대원명을 입력해주세요
            </HeroText>
            <Box>
              <HeroTextField id="standard-required" label="닉네임을 작성해 주세요" required variant="standard" helperText="15자 이내로 작성해 주세요!" />
              <CheckButton variant="contained">중복확인</CheckButton>
            </Box>
            {/* <TextField error helperText="10자 이내로 작성해 주세요!" /> */}
            <SignUpStack direction="row">
              <SignUpButton variant="contained">가입완료</SignUpButton>
            </SignUpStack>
          </div>
        </main>
      </SignUpWrapper>
    </ThemeProvider>

  );
};


export default User