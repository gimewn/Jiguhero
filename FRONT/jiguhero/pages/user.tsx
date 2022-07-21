import Head from "next/head"
import type { NextPage } from 'next'
import React from "react";
import TextField  from "@mui/material/TextField";
import InputLabel from '@material-ui/core/InputLabel';

const User: NextPage = ()=>{
    return(
    <div>
        <Head>
            <title>회원가입 | 지구-방위대</title>
        </Head>

        <main>
            <h1>hi hello</h1>
            <TextField label="닉네임을 작성해 주세요" required />
            {/* <TextField error helperText="10자 이내로 작성해 주세요!" /> */}
 
        </main>
    </div>
    );
};


export default User