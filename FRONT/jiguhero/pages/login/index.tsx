import Head from "next/head"
import Link from "next/link"
import type { NextPage } from 'next'
import styled from "styled-components"
import theme from "../index";
import { ThemeProvider } from '@mui/material';
import KakaoImg from '/public/kakao_login.png';
import Image from 'next/image';

const IndexText = styled('div')`
  margin: 1rem;
`
const LoginWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoginText = styled('h1')`
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 5rem;
`
const SnsLoginText = styled('span')`
  display:flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`
const SnsLoginKakao = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  
`

const Login: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoginWrapper>
        <Head>
          <title>로그인 | 지구-방위대</title>
        </Head>
        <main>
          <IndexText>
            <Link href="">
              <a>마이페이지</a>
            </Link>
          </IndexText>

          <LoginText>로그인</LoginText>
          <SnsLoginText>
            SNS 계정으로 로그인하기
          </SnsLoginText>
          <SnsLoginKakao>

          </SnsLoginKakao>
        </main>
      </LoginWrapper>
    </ThemeProvider>
  );
};

export default Login