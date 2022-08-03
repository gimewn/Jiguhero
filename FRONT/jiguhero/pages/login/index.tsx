import Head from "node_modules/next/head"
import styled from "styled-components"
import Image from 'node_modules/next/image';
import KakaoImg from '/public/kakao_login.png';
import GoogleImg from '/public/google_login.png';
import NaverImg from '/public/naver_login.png';
import KakaoLogImg from '/public/kakao.png';
import Router from 'node_modules/next/router';
// import GoogleLogin from 'react-google-login';
import * as React from 'react'
import Script from 'next/script';

//구글
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  //클라이언트 ID (환경변수)
  // let googleClientId: string = process.env.REACT_APP_CLIENT_ID || "";
  // 사용자 정보를 담아둘 userObj
  // const [userObj, setUserObj] = React.useState({
  //   email: "",
  //   name: ""
  // })
  // //로그인 성공시 res처리
  // const onLoginSuccess = (res: any) => {
  //   setUserObj({
  //     ...userObj,
  //     email: res.profileObj.email,
  //     name: res.profileObj.name
  //   })
  // }

  //구글
  const googleSuccess = async (res) => {
    console.log('auth.js-googlesuccess-res', res)
    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${res.credential}`)
      .then(res => res.json())
      .then(response => {
        console.log('user Info=', response)
      })
      .catch(error => console.log(error));
  };
  const googleError = (error) => {
    console.log('google signin failed-error', error)
  }


  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  // });


  //카카오
  const kakaoLogin = async () => {
    const kakao = (window as any).Kakao;
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

  //네이버


  return (
    <>
      <LoginWrapper>
        {/* header 추가 */}
        <Head>
          <title>로그인 | 지구-방위대</title>
          {/* <meta name="google-signin-scope" content="profile email" />
          <meta name="google-signin-client_id" content="%748891844766-2mnlsibs54s53a1u1q2p6b659bbqrbed.apps.googleusercontent.com%" /> */}
        </Head>
        <main>
          {/* <Script src="https://apis.google.com/js/platform.js" async defer /> */}
          <LoginText>로그인</LoginText>
          <SnsLoginText>SNS 계정으로 로그인하기</SnsLoginText>

          {/* 카카오 로그인 */}
          <SnsLoginKakao onClick={kakaoLogin}>
            <Image src={KakaoLogImg} />
            {/* <Image src={KakaoImg} /> */}
          </SnsLoginKakao>

          {/* 네이버 로그인
          <SnsLoginNaver>
            <Image src={NaverImg} />
          </SnsLoginNaver> */}


          {/* 구글 로그인 */}
          {/* <SnsLoginGoogle
            clientId='748891844766-2mnlsibs54s53a1u1q2p6b659bbqrbed.apps.googleusercontent.com'
            buttonText="Google로 로그인"
            onSuccess={result => onLoginSuccess(result)}
            onFailure={result => console.log(result)}
          /> */}
          {/* <GoogleOAuthProvider clientId='748891844766-2mnlsibs54s53a1u1q2p6b659bbqrbed.apps.googleusercontent.com'>
            <GoogleLogin
              buttonText="Google로 로그인"
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              onFailure={result => console.log(result)}
            />
          </GoogleOAuthProvider> */}
          <GoogleOAuthProvider clientId="748891844766-2mnlsibs54s53a1u1q2p6b659bbqrbed.apps.googleusercontent.com">
            <GoogleLogin
              buttonText="Google 로그인"
              onSuccess={googleSuccess}
              onFailure={googleError}
            />

            {/* 
            <MyCustomButton onClick={() => login()}>
              Sign in with Google 🚀{' '}
            </MyCustomButton>; */}

          </GoogleOAuthProvider>

        </main>
      </LoginWrapper>
    </>
  );
};


const MyCustomButton = styled(GoogleLogin)`

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
const SnsLoginGoogle = styled(GoogleLogin)`
        display: flex;
        justify-content: center;
        align-items: center;
        width : 300px;
        height: 45px;
        `

const SnsLoginNaver = styled('div')`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20rem;
        `

