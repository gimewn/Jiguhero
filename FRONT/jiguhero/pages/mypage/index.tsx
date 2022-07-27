import { Box, Container } from "@mui/system";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { ButtonGroup, Fab, Stack, Paper } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BorderColorOutlined } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    action: {
      hover: "#FF4848"
    },
    yeondoo: {
      main: '#98C064',
      contrastText: '#fff',
    },
    hanle: {
      main: 'white',
      contrastText: '#65ACE2',
    },
    dahong: {
      main: '#FF4848',
      contrastText: '#fff',
    }
  },
});
console.log(theme)


declare module '@mui/material/styles' {
  interface Palette {
    yeondoo: Palette['primary'],
    hanle: Palette['primary'];
    dahong: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    yeondoo?: PaletteOptions['primary'],
    hanle?: PaletteOptions['primary'];
    dahong?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    yeondoo: true,
    hanle: true;
    dahong: true;
  }
}



const Profile = styled("div")`
  display: flex;
`;

const ContainerStyle = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: sm;
`;
const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
}));

const Mypage = () => {
  // 탭 전환
  const [tab, setTab] = useState(true);

  // 프로필
  function Profilee() {
    return (
      <Profile>
        <Avatar
          variant="circular"
          alt="nitz"
          src="IMG_1008.JPG"
          sx={{ width: 56, height: 56 }}
        >
          Knit
        </Avatar>
        <h2 style={{ margin: "20px" }}>니츠</h2>
        <ArrowForwardIosRoundedIcon />
      </Profile>
    );
  }

  // 임무
  function Mission() {
    const MissionList = ["하나", "둘", "셋"];

    return (
      <Stack spacing={1}>
        {MissionList.map((num) => (
          <Item key={num}>{num}</Item>
        ))}
      </Stack>
    );
  }

  // 활동구역
  function PlayingArea() {
    const PlayedArea = [
      { icon: "❤️", title: "내가 애정하는 친환경 카페" },
      { icon: "🏝", title: "제주도의 제로웨이스트 샵" },
      { icon: "🍽", title: "광주광역시의 비건식당" },
    ];

    return (
      <Stack spacing={1}>
        {PlayedArea.map((dic) => (
          <Item key={dic.title}>
            {dic.icon}
            {dic.title}
          </Item>
        ))}
      </Stack>
    );
  }

  // 프로필 클릭
  const onClickBox = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(event);
  };

  return (
    <ContainerStyle>
      <Box onClick={onClickBox}>
        <Grid container>
          <Grid item xs={12}>
            <Profilee />
          </Grid>
        </Grid>
      </Box>

      <h3>현재 보유 포인트: 500</h3>
      <p>👀내가 좋아요한 활동구역 & 임무</p>

      <ThemeProvider theme={theme}>
        <ButtonGroup variant="outlined">
          <Fab
            size="medium"
            variant="extended"

            onClick={() => {
              setTab(true);
            }}
            color={tab ? "yeondoo" : "hanle"}
            style={{border: `${tab ? "null": "10px #65ACE2"}`, boxshadow:'0px'}}
            
          >
            활동구역
          </Fab>
          <Fab
            size="medium"
            variant="extended"
            onClick={() => {
              setTab(false);
            }}
            color={tab ? "hanle" : "yeondoo"}
            style={{border: `${tab ? "null": "10px #65ACE2"}`}}
            
          >
            임무
          </Fab>
        </ButtonGroup>
      <Box>{tab ? <PlayingArea /> : <Mission />}</Box>
      <Fab size="medium" variant="extended" color="dahong" >
        로그아웃
      </Fab>
      </ThemeProvider>
    </ContainerStyle>
  );
};

export default Mypage;
