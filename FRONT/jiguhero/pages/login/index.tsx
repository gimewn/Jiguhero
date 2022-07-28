import Head from "next/head"
import styled from "styled-components"
import KakaoImg from '/public/kakao_login.png';
import Image from 'next/image';

export default function Login() {
  return (
    <>
      <IndexText>
      </IndexText>

      <LoginWrapper>
        {/* header 추가 */}
        <Head>
          <title>로그인 | 지구-방위대</title>
        </Head>
        <main>

          <LoginText>로그인</LoginText>
          <SnsLoginText>
            SNS 계정으로 로그인하기
          </SnsLoginText>
          {/* 카카오 로그인 */}
          <SnsLoginKakao>
            <Image src={KakaoImg} />
          </SnsLoginKakao>
          {/* 네이버 로그인 */}
          {/* 구글 로그인 */}
        </main>
      </LoginWrapper>
    </>
  );
};

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
  margin: 3rem;
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


