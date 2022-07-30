import Head from "next/head"
import styled from "styled-components"
import KakaoImg from '/public/kakao_login.png';
import GoogleImg from '/public/google_login.png';
import NaverImg from '/public/naver_login.png';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  // const { data, status } = useSession();
  // session에서 OAuth 사용자 정보 확인하기
  const { data: session } = useSession()

  // 사용자 정보 있으면, 이메일과 로그아웃 버튼 출력
  // if (session) {
  //   return <>
  //     Signed in as {session.user.email} <br />
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  return (
    <>

      <LoginWrapper>
        {/* header 추가 */}
        <Head>
          <title>로그인 | 지구-방위대</title>
        </Head>

        <main>
          <LoginText>로그인</LoginText>
          <SnsLoginText>SNS 계정으로 로그인하기</SnsLoginText>

          {/* 카카오 로그인 */}
          <SnsLoginKakao>
            <Image src={KakaoImg} />
          </SnsLoginKakao>

          {/* 네이버 로그인 */}
          <SnsLoginNaver>
            <Image src={NaverImg} />
          </SnsLoginNaver>


          {/* 구글 로그인 */}
          <SnsLoginGoogle>
            <Image src={GoogleImg} />
          </SnsLoginGoogle>

          {/* // 사용자 정보 없으면, 로그인 버튼 출력 - signIn() 함수는 next-auth기본 로그인화면으로 이동시켜준다. */}
          {/* <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </> */}


          {/* <p>status: {status}</p>
          <p>{data?.user?.name}</p>
          {data?.user ? (
            <button type="button" onClick={() => signOut()}>
              Google Logout
            </button>
          ) : (
            <button type="button" onClick={() => signIn("google")}>
              Google Login
            </button>
          )} */}

        </main>
      </LoginWrapper>
    </>
  );
};


const LoginWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoginText = styled('h1')`
  display:flex;
  justify-content: center;
  align-items: center;
  /* margin: 3.5rem; */
  height: 10vh;
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
  width: 20rem;
  
`
const SnsLoginGoogle = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
`

const SnsLoginNaver = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
`



