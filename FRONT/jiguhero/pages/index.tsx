import GroundTop5 from "components/Top5Slide";
import styled from "styled-components";
import MissionTop3 from "components/MissionTop3";
import Map from "components/map";
import News from "components/News";
import { ParentsDiv } from "styles/styled";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { UserId, UserName } from "states/user";
import Banner from "components/Banner";

const Mapping = styled("div")`
  width: 100%;
  height: 300px;
  @media screen and (min-width: 600px) {
    height: 500px;
  }
`;
const Title = styled("p")`
  font-weight: bold;
  font-size: 1.1em;
`;
const TitleWithOutMargin = styled('p')`
  font-weight: bold;
  font-size: 1.1em;
  margin-top:0px;
`
const Block = styled('div')`
padding: 0px 10px 10px 10px;
`
const Content = styled('div')`
  display:flex;
  flex-direction: column;
  align-items: center;

  `

export default function Home() {
  const router = useRouter();
  const token = router?.query.token;
  const register = router?.query.REGISTER;
  

  const [userId, setUserId] = useRecoilState(UserId)
  console.log(router.query)

  if (register === "REQUIRED") {
    localStorage.setItem("access-token",JSON.stringify(token));
    router.push(`/user/${router.query.userid}/${token}`);
  }

  if(register === "DONE"){
    localStorage.setItem("access-token",JSON.stringify(token));
        setUserId(router.query.userid.toString())
  }


  // useEffect(() => {
  //   if (token) {
  //     if (register !== "REQUIRED"){
  //       localStorage.setItem("access-token", token.toString());
  //       setUserId(router.query.userid.toString())
  //     }
  //   }
  //   }, []);
 

  return (
    <ParentsDiv>
      <Block>
        <TitleWithOutMargin>
          ☘️ 내 주변 친환경 가게를 찾아보자!
        </TitleWithOutMargin>
        <Content>
          <Mapping>
            <Map />
          </Mapping>
        </Content>
      </Block>
      <Block>
        <Title>🧐 가장 핫한 대원들의 활동구역 TOP5</Title>
        <Content>
          <GroundTop5 />
        </Content>
      </Block>
      <Block>
        <Title>🔥 대원들이 가장 많이 도전 중인 임무</Title>
        <Content>
          <MissionTop3 />
        </Content>
      </Block>
      {/* <Block>
        <Title onClick={() => router.push("/news")}>📰 대원들을 위한 친환경 소식</Title>

        <Content>
          <News />
        </Content>
      </Block> */}
    </ParentsDiv>
  );
}