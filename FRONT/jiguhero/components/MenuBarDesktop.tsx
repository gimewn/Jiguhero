/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { UserId } from 'states/user';

const Menu = styled('div')`
  display: flex;
  justify-content: start;
  align-items: center;
  a{
    font-family:'PyeongChang-Bold';
    margin: 0 10px;
    color:#555555;
    font-size:15px;
  }
  a:hover{
    color:#65ACE2;
  }
  .active{
    color:#65ACE2;
  }
`

export default function UnderlineLink() {
  const router = useRouter();
  const [flag, setFlag] = React.useState(0)
  React.useEffect(()=>{
    if (localStorage.getItem('access-token')){
      setFlag(1)
    }else{
      setFlag(0)
    }
  })
  
  return (
    <Menu id="NavBar">
      <Link href="/" className="navMenu">
        <a className={router.pathname == "/" ? "active" : ""}>메인</a>
      </Link>
      <Link href="/ground" className="navMenu">
        <a className={router.pathname == "/ground" ? "active" : ""}>활동구역</a>
      </Link>
      <Link href="/mission" className="navMenu">
        <a className={router.pathname == "/mission" ? "active" : ""}>대원들의 임무</a>
      </Link>
      <Link href="/mission/nowjoin" className="navMenu">
        <a className={router.pathname == "/mission/nowjoin" ? "active" : ""}>임무 인증</a>
      </Link>
      {flag ? <Link href="/mypage" className="navMenu">
          <a className={router.pathname == "/mypage" ? "active" : ""}>마이페이지</a>
      </Link> : <Link href="/login" className="navMenu">
          <a className={router.pathname == "/login" ? "active" : ""}>로그인</a>
      </Link>}
      
    </Menu>
  );
}