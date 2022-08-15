import KakaoImg from "/public/kakao_login.png";
import GoogleImg from "/public/google_login.png";
import NaverImg from "/public/naver_login.png";
import Image from "node_modules/next/image";
import Head from "node_modules/next/head";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { NextPageContext } from "node_modules/next/dist/shared/lib/utils";
import loginAccess from "pages/api/login";
import { NextPage } from "next";

export default function Login() {
  const router = useRouter();
  const returnUrl = router.query.returnUrl;

  return (
    <>
      <LoginWrapper>
        <Head>
          {/* header 추가 */}
          <title>로그인 | 지구-방위대</title>
        </Head>
        <main>
          <LoginText>로그인</LoginText>
          <SnsLoginText>SNS 계정으로 로그인하기</SnsLoginText>

          {/* 카카오 로그인*/}
          <SnsLoginKakao>
            <a href="http://i7c105.p.ssafy.io:8080/oauth2/authorize/kakao?redirect_uri=http://localhost:3000">
              <Image src={KakaoImg} alt="Kakao" />
            </a>
          </SnsLoginKakao>

          {/* 구글 로그인*/}
          <SnsLoginGoogle>
            <a href="http://i7c105.p.ssafy.io:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000">
              <Image src={GoogleImg} alt="Google" />
            </a>
          </SnsLoginGoogle>

          <SnsLoginNaver>
            <a href="http://i7c105.p.ssafy.io:8080/oauth2/authorize/naver?redirect_uri=http://localhost:3000">
              <Image src={NaverImg} alt="Naver" />
            </a>
          </SnsLoginNaver>
          <button onClick={() => { }}>Logout</button>
        </main>
      </LoginWrapper>
    </>
  );
}

const LoginWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginText = styled("h1")`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 3.5rem; */
  height: 10vh;
`;
const SnsLoginText = styled("span")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;
const SnsLoginKakao = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
`;
const SnsLoginGoogle = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
`;

const SnsLoginNaver = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
`;

// export async function getServerSideProps(context: NextPageContext) {

//   return {

//   };
// }
