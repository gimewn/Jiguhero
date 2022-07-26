import { Box, Container } from "@mui/system";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Button, ButtonGroup, Fab, Stack, Paper } from "@mui/material";


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

function Nickname() {
  return <h2>니츠</h2>;
}

const onClickBox = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  console.log(event);
};

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
	


	textAlign: 'center',

}));
function PlayingArea() {
	
	const PlayedArea = [{'icon': '❤️', 'title': '내가 애정하는 친환경 카페'}, {'icon': '🏝', 'title': '제주도의 제로웨이스트 샵'}, {'icon': '🍽', 'title':'광주광역시의 비건식당'}]

	return (
		<Stack spacing={1} >

			{PlayedArea.map((dic) => (
			<Item >
				{dic.icon}
				{dic.title}
			</Item>
			))}
		</Stack>
	)
}
function Mission() {
	const MissionList = ['하나', '둘', '셋']
	return (
				<Stack spacing={1} >

			{MissionList.map((num) => (
			<Item onClick={onClickMission} >
				{num}	
			</Item>
			))}
		</Stack>
	)
}

const onClickPlayed = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
	
}

const onClickMission = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
	console.log(event)
}

const Mypage = () => {
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
      <ButtonGroup variant="outlined">
        <Fab size="medium" variant="extended">
          활동구역
        </Fab>
        <Fab size="medium" variant="extended">
          임무
        </Fab>
      </ButtonGroup>
      <Box>
				<PlayingArea />
				<Mission  />
			</Box>
    </ContainerStyle>
  );
};

export default Mypage;
