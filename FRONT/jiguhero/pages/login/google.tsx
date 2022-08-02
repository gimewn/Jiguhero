import { NextPage } from 'next';
import Router from 'next/router';
import * as React from 'react';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';

export default function Google() {

  const onLogoutSuccess = () => {
    console.log('onLogoutSuccess')
    Router.push('/');
  }

  const onFailure = () => {
    console.log('onFailure');
  }

  return (
    <Wrapper>
      <Title>Google Page...</Title>
      <Button
        clientId='748891844766-2mnlsibs54s53a1u1q2p6b659bbqrbed.apps.googleusercontent.com' // 발급된 clientId 등록
        onLogoutSuccess={onLogoutSuccess}
        onFailure={onFailure}
        buttonText='Google 로그아웃' // 버튼에 사용될 텍스트
      />
    </Wrapper>
  )
}


const Wrapper = styled.div`
    max-width: 720px;

    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h2``;

const Button = styled(GoogleLogout)`
    width: 360px;
    height: 40px;

    margin: 6px 0;

    justify-content: center;

    & span {
        font-size: 18px;
        font-weight: 700 !important;
    }
`;