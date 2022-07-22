import Head from "next/head"
import type { NextPage } from 'next'
import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import StylesProvider from "@mui/material/styles"
import styled from "styled-components"

const SignUpWrapper = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
`
export default function User() {
  return (
    <SignUpWrapper>
      <Head>
        <title>회원가입 | 지구-방위대</title>
      </Head>
      <main>
        <h2>회원가입</h2>
        <Stack direction="row" >
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Stack>
        <div>
          <Box>
            <TextField id="standard-required" label="닉네임을 작성해 주세요" required variant="standard" helperText="15자 이내로 작성해 주세요!" />
            <Button variant="contained">중복확인</Button>
          </Box>
          {/* <TextField error helperText="10자 이내로 작성해 주세요!" /> */}
          <Stack direction="row">
            <Button variant="contained">가입완료</Button>
          </Stack>
        </div>
      </main>
    </SignUpWrapper>

  );
};

