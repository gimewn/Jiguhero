import Head from "next/head"
import styled from "styled-components"
import Image from 'node_modules/next/image';
import KakaoImg from '/public/kakao_login.png';
import GoogleImg from '/public/google_login.png';
import NaverImg from '/public/naver_login.png';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';

export default function Login() {

  const onSuccess = (res: any) => {
    console.log(res); // 로그인한 사용자 정보 조회
    Router.push('/google'); // /google 페이지로 이동
  }

  const onFailure = (error: any) => {
    console.log(error);
    window.addEventListener("message", ({ data }) => {
      console.log(data)
    })
  }


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

          <Wrapper>
            <Header.Container>
              <Header.Title>로그인할 방법을 선택해주세요.</Header.Title>
            </Header.Container>

            <Button.Container>
              <Button.ButtonList>
                <Button.GoogleButton
                  clientId='748891844766-2mnlsibs54s53a1u1q2p6b659bbqrbed.apps.googleusercontent.com' // 발급된 clientId 등록
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'} // 쿠키 정책 등록
                  buttonText='Google 로그인' // 버튼에 사용될 텍스트
                />
              </Button.ButtonList>
            </Button.Container>
          </Wrapper>



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


////google
const Wrapper = styled.div`
    max-width: 720px;

    margin: 0 auto;
`

const Header = {
  Container: styled.div`
        text-align: center;
    `,

  Title: styled.h2``,
}

const Button = {
  Container: styled.div``,

  ButtonList: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,

  GoogleButton: styled(GoogleLogin)`
        width: 360px;
        height: 40px;

        margin: 6px 0;

        justify-content: center;

        & span {
            font-size: 18px;
            font-weight: 700 !important;
        }
    `,
}
