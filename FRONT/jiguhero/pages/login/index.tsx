import Head from "next/head"
import Link from "next/link"
import type { NextPage } from 'next'
import styled from "styled-components"

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoginText = styled.h1`
  display:flex;
  justify-content: center;
  align-items: center;
`
const SnsLoginText = styled.span`
  display:flex;
  justify-content: center;
  align-items: center;
`

const Login: NextPage = () => {
  return (
    <LoginWrapper>
      <Head>
        <title>로그인 | 지구-방위대</title>
      </Head>
      <main>
        <Link href="">
          <a>마이페이지</a>
        </Link>

        <LoginText>로그인</LoginText>
        <SnsLoginText>
          SNS 계정으로 로그인하기
        </SnsLoginText>
      </main>
    </LoginWrapper>
  );
};

export default Login