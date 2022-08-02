import Head from "next/head"
import styled from "styled-components"
import Image from 'node_modules/next/image';
import KakaoImg from '/public/kakao_login.png';
import GoogleImg from '/public/google_login.png';
import NaverImg from '/public/naver_login.png';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import * as React from 'react'
import Script from 'next/script';

export default function Login() {

  // const onSuccess = (res: any) => {
  //   console.log(res); // 로그인한 사용자 정보 조회
  //   Router.push('/google'); // /google 페이지로 이동
  // }

  // const onFailure = (error: any) => {
  //   console.log(error);
  //   window.addEventListener("message", ({ data }) => {
  //     console.log(data)
  //   })
  // }


  //사용자 정보를 담아둘 userObj
  const [userObj, setUserObj] = React.useState({
    email: "",
    name: ""
  })
  //로그인 성공시 res처리
  const onLoginSuccess = (res: any) => {
    setUserObj({
      ...userObj,
      email: res.profileObj.email,
      name: res.profileObj.name
    })
  }

  // 카카오 로그인!
  const kakaoLogin = async () => {
    const kakao = (window as any).Kakao;

    // 카카오 로그인 구현
    kakao.Auth.login({
      success: () => {
        kakao.API.request({
          url: '/v2/user/me', // 사용자 정보 가져오기
          success: (res: any) => {
            // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
            console.log(res);
            Router.push('/login/kakao');
          },
          fail: (error: any) => {
            console.log(error);
          }
        })
      },
      fail: (error: any) => {
        console.log(error);
      }
    })
  }
  return (
    <>

      <LoginWrapper>
        {/* header 추가 */}
        <Head>
          <title>로그인 | 지구-방위대</title>
          <meta name="google-signin-scope" content="profile email" />
          <meta name="google-signin-client_id" content="%748891844766-2mnlsibs54s53a1u1q2p6b659bbqrbed.apps.googleusercontent.com%" />
        </Head>
        <main>
          <Script src="https://apis.google.com/js/platform.js" async defer />
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

          <div>
            <GoogleLogin
              clientId='748891844766-2mnlsibs54s53a1u1q2p6b659bbqrbed.apps.googleusercontent.com'
              buttonText="Google 아이디로 로그인"
              onSuccess={result => onLoginSuccess(result)}
              onFailure={result => console.log(result)}
              cookiePolicy={'single_host_origin'}
            />
          </div>


          <Button.Container>
            <Button.ButtonList>
              <Button.KakaoButton onClick={kakaoLogin}>
                <Button.ButtonText>Kakao</Button.ButtonText>
              </Button.KakaoButton>
            </Button.ButtonList>
          </Button.Container>






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


//kakao
const Button = {
  Container: styled.div``,

  ButtonList: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,

  KakaoButton: styled.button`
        background-color: #fef01b;

        width: 360px;
        height: 40px;

        margin: 6px 0;

        border: none;
        border-radius: 6px;

        cursor: pointer;
    `,

  ButtonText: styled.h4`
        margin: 0;
        padding: 0;
        
        font-size: 18px;
        color: #ffffff;
    `,
}