import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from 'next/link';
import styled from 'styled-components';

const Label = styled('p')`
  margin: 0 5px 0 5px;
  font-size:0.7em;
`
const NavForMobile = styled('div')`
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  background-attachment: fixed;
  a{
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    svg{
      color: #98C064;
      font-size:2em;
      &:hover{
        color:#65ACE2;
      }
    }
    &.active{
        svg{
          color:#65ACE2;
          font-size:2.2em;
        }
        p{
          font-color:#98C064;
          font-size:0.8em;
        }
      }
}
`

export default function SimpleBottomNavigation() {
  // const [value, setValue] = React.useState();
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
    <NavForMobile>
      <Link href="/" className="navMenu">
        <a className={router.pathname == "/" ? "active" : ""}>
          <HomeRoundedIcon />
          <Label>메인</Label>
        </a>
      </Link>
      <Link href="/ground" className="navMenu">
        <a className={router.pathname == "/ground" ? "active" : ""}>
          <MapRoundedIcon />
          <Label>활동구역</Label>
        </a>
      </Link>
      <Link href="/mission" className="navMenu">
        <a className={router.pathname == "/mission" ? "active" : ""}>
          <PeopleAltRoundedIcon />
          <Label>대원들의 임무</Label>
        </a>
      </Link>
      <Link href="/mission/nowjoin" className="navMenu">
        <a className={router.pathname == "/mission/nowjoin" ? "active" : ""}>
          <CameraAltRoundedIcon />
          <Label>임무 인증</Label>
        </a>
      </Link>
      {flag ? <>
      <Link href="/mypage" className="navMenu">
        <a className={router.pathname == "/mypage" ? "active" : ""}>
          <PersonRoundedIcon />
          <Label>마이페이지</Label>
        </a>
      </Link>
      </> 
        : <>
        <Link href="/login" className="navMenu">
        <a className={router.pathname == "/login" ? "active" : ""}>
          <PersonRoundedIcon />
          <Label>로그인</Label>
        </a>
      </Link>
        </>}
    </NavForMobile>
      // <BottomNavigation
      //   showLabels
      //   value={value}
      //   onChange={(event, newValue) => {
      //     setValue(newValue);
      //   }}
      // >
      //   <BottomNavigationAction sx={{p:0, minWidth:0}} label="메인" icon={<HomeRoundedIcon />} onClick={() => onLink("/")} />
      //   <BottomNavigationAction sx={{p:0, minWidth:0}} label="활동구역" icon={<MapRoundedIcon />} onClick={() => onLink("/ground")} />
      //   <BottomNavigationAction sx={{p:0, minWidth:0}} label="대원들의 임무" icon={<PeopleAltRoundedIcon />} onClick={() => onLink("/mission")} />
      //   <BottomNavigationAction sx={{p:0, minWidth:0}} label="임무 인증" icon={<CameraAltRoundedIcon />} onClick={() => onLink("/mission/nowjoin")} />
      //   <BottomNavigationAction sx={{p:0, minWidth:0}} label="마이페이지" icon={<PersonRoundedIcon />} onClick={() => onLink("/mypage")} />
      // </BottomNavigation>
  );
}