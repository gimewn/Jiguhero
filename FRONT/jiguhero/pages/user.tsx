import Head from "next/head"
import type { NextPage } from 'next'
import React from "react";
import TextField  from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'


const User: NextPage = ()=>{
    return(
    <div>
        <Head>
            <title>회원가입 | 지구-방위대</title>
        </Head>

        <main>
            <h1>회원가입</h1>
            <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <PhotoCamera />
                </IconButton>
            </Stack>
            <div>
                사용하실 대원명을 입력해주세요
            </div>
            <Box>
                <TextField id="standard-required" label="닉네임을 작성해 주세요" required variant="standard" />  
                <Button variant="contained">중복확인</Button>
           </Box>
            {/* <TextField error helperText="10자 이내로 작성해 주세요!" /> */}
            <Stack spacing={2} direction="row">
                <Button variant="contained">가입완료</Button>
            </Stack>
        </main>
    </div>
    );
};


export default User