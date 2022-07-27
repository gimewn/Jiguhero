import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useRouter } from "next/router";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const onLink = (href) => {
    router.push(href);
  };

  return (
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction sx={{p:0, minWidth:0}} label="메인" icon={<HomeRoundedIcon />} onClick={() => onLink("/")} />
        <BottomNavigationAction sx={{p:0, minWidth:0}} label="활동구역" icon={<MapRoundedIcon />} onClick={() => onLink("/ground")} />
        <BottomNavigationAction sx={{p:0, minWidth:0}} label="대원들의 임무" icon={<PeopleAltRoundedIcon />} onClick={() => onLink("/mission")} />
        <BottomNavigationAction sx={{p:0, minWidth:0}} label="임무 인증" icon={<CameraAltRoundedIcon />} onClick={() => onLink("/mission/nowjoin")} />
        <BottomNavigationAction sx={{p:0, minWidth:0}} label="마이페이지" icon={<PersonRoundedIcon />} onClick={() => onLink("/mypage")} />
      </BottomNavigation>
  );
}