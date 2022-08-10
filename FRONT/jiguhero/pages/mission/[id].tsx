import Head from 'next/head';
import styled from 'styled-components';
import Backcomponents from 'components/back';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import missionUserData from 'pages/api/mission/[id]';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { ButtonFull, ButtonBorder } from 'styles/styled';
import { useRouter } from 'next/router';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import { useState } from 'react';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';


const NavBar = styled('div')`
 /* position: fixed; */
  left: 0;
  right: 0;
  top:80px;
  height: 60px;
  /* padding: 2rem; */
  background: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
    @media only screen and (min-width: 650px) {
    display:none;
  }
`
const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  margin: 0px 5px 0px 20px;
`;
const MobileMore = styled(MoreVertRoundedIcon)`
    color: #98C064;
    :hover{
        cursor: pointer;
    }
      @media only screen and (min-width: 650px) {
    display:none;
  }
`

const BackCompo = styled(Backcomponents)`
  margin-top: 10px;
  margin-bottom: 10px;
`

const Block = styled('div')`
  margin-top: 0.4rem;

`
const Content = styled('div')`
  display:flex;
  justify-content: left;
  margin-left: 20px;
`
const ImageBlock = styled('div')`
  display:flex;
  flex-direction: row;
  justify-content: center;
    @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 500px){
        width:400px;
    }
    @media screen and (min-width:700px){
        width:400px;
    }
    img{
        max-width: 100%;
        @media screen and (min-width:700px){
        margin-top: 15px;
    }
        
    }
`

const PeopleIcon = styled(EmojiPeopleRoundedIcon)`
    color: #98C064;
    margin-right: 5px;
    margin-left: 5px;
`
const PointIcon = styled(MonetizationOnRoundedIcon)`
    color: #98C064;
    margin-right: 5px;
    margin-left: 5px;
`
const CalendarIcon = styled(CalendarMonthRoundedIcon)`
    color: #98C064;
    margin-right: 5px;
    margin-left: 5px;
`
const TitleText = styled('a')`
    font-size: x-large;
    font-weight: bold;
`
const ContentText = styled('a')`
    font-size: medium;
`
const LocalIcon = styled(RoomRoundedIcon)`
    color: #98C064;
    margin-right: 5px;
    margin-left: 5px;
`
const WebBtn = styled(ButtonFull)`

  border-radius: 12.5px;
  padding:5px;
  color: white;
  font-size: x-small;
  margin: 3px;

`
const BtnContent = styled('div')`
    display:flex;
    justify-content: flex-end;
    @media only screen and (max-width:650px){
        display: none;
    }
    @media screen and (min-width:700px){
        margin-right: 3.5rem;
    }
`

const ModalMore = styled('div')`
    z-index: 999;
    position: absolute;
    display: flex;
    flex-direction: column;
    /* float: right; */
    left:0;
    right:0;
  /* min-width: auto;
  z-index: 999;
  position: absolute;
  left:0;
  right:0;
  bottom:0;
  display: flex;
  justify-content: center; */

  @media only screen and (min-width: 650px) {
    display:none;
  }
`
// const ModalBtn = styled('div')`
//     display: flex;
//     flex-direction: column;

// `

const CancleBtn = styled('button')`
  border: 1px solid #a5a1a1;
  border-radius: 15px;
  color: white;
  background-color: #a5a1a1;
  height: 40px;
  margin: 5px;
  min-width: 150px;
  :hover{
    cursor: pointer;
  }
`
const LinkBtn = styled(CancleBtn)`
    border: 1px solid #7fb5e4;
    background-color: #7fb5e4;
    min-width: 150px;
`

const DeleteBtn = styled(CancleBtn)`
    border: 1px solid coral;
    background-color: coral;
    min-width: 150px;
`

const ModifyBtn = styled(LinkBtn)`
    min-width: 150px;

`

const NoBtn = styled('button')`
  border-radius: 15px;
  width: 75%;
  height: 40px;
  margin: 5px;
  border: none;
  background-color: unset;
  :hover{
    cursor: none;
  }
`
const Div = styled('div')`
    margin-left:auto;
    margin-right:15PX;
    display:flex;
    flex-direction:column;
`

const BorderHeart = styled(FavoriteBorderRoundedIcon)`
    color: coral;
    
`
const FullHeart = styled(FavoriteRoundedIcon)`
    color: coral;
`

const HeartDiv = styled('div')`
border-radius: 15px;
border: 1px solid coral;
padding: 7px;
`


//미션 올린 사람 x 모바일 뷰 더보기 모달창
function MissionUnAuthModal() {
    return (
        <Div>
            <NoBtn />
            <LinkBtn>링크 복사하기</LinkBtn>
            <CancleBtn> 취소</CancleBtn>

        </Div>
    )
}

//미션 올린 사람일 경우 모바일 뷰 더보기 모달창
function MissionAuthModal() {

    return (
        <Div>
            <ModifyBtn>임무 내용 수정하기</ModifyBtn>
            <DeleteBtn>임무 삭제하기</DeleteBtn>
            <CancleBtn> 취소</CancleBtn>
        </Div>
    )
}

function LikeAndState() {
    return (
        <>
            <div>
                <HeartDiv>
                    <BorderHeart />
                </HeartDiv>
                {/* <FullHeart /> */}
            </div>

            <div>
                <ButtonFull
                    hColor={"#98C064"}
                    dColor={"#65ACE2"}>
                    참여중인 임무입니다</ButtonFull>

            </div>

        </>
    )
}

export default function MissionDetail() {
    const router = useRouter()
    const { data: MissionDetail } = useQuery(['missions'], missionUserData)
    console.log(MissionDetail)
    const [Auth, setAuth] = useState(false)
    const [unAuth, setUnAuth] = useState(false)

    return (
        <>
            <div>
                {/* 헤더 */}
                <Head>
                    <title>임무상세 | 지구-방위대</title>
                </Head>

                <NavBar>

                    <Header>
                        {/* 모바일 뷰에서 뒤로가기 버튼! */}
                        <BackCompo name='임무 상세보기'></BackCompo>
                        {/* 모바일 뷰에서 모달창 */}
                        {/* 작성자일 때 */}
                        <MobileMore onClick={() => setAuth(!Auth)} />
                        {/* 작성자 아닐 때 */}
                        {/* <MobileMore onClick={() => setUnAuth(!unAuth)} /> */}

                    </Header>
                </NavBar>

                {/* Modal창 */}
                <ModalMore>
                    {/* 작성자일 떄 */}
                    {Auth === true ? <MissionAuthModal /> : null}
                    {/* 작성자 아닐 때 */}
                    {/* {unAuth === true ? <MissionUnAuthModal /> : null} */}
                </ModalMore>

                {/* 미션이미지 */}
                <div>
                    <ImageBlock>
                        <img src={MissionDetail?.repImageURL} />
                    </ImageBlock>
                </div>

                {/* 임무타이틀 */}
                <Block>
                    <Content>
                        <TitleText>{MissionDetail?.title}</TitleText>
                    </Content>
                </Block>

                {/* 참여자수/정원 */}
                <Block>
                    <Content>
                        < PeopleIcon />
                        <ContentText>{MissionDetail?.nowPerson} / {MissionDetail?.maxPerson} 명</ContentText>
                    </Content>
                </Block>

                {/* 포인트 */}
                <Block>
                    <Content>
                        <PointIcon />
                        <ContentText>+{MissionDetail?.entryPoint}P</ContentText>
                    </Content>
                </Block>

                {/* 활동기간 */}
                <Block>
                    <Content>
                        <CalendarIcon />
                        <ContentText>
                            {MissionDetail?.startDate[0]}.{MissionDetail?.startDate[1]}.{MissionDetail?.startDate[2]}
                            ~ {MissionDetail?.endDate[0]}.{MissionDetail?.endDate[1]}.{MissionDetail?.endDate[2]}
                        </ContentText>
                    </Content>
                </Block>

                {/* 미션장소 */}
                <Block>
                    <Content>
                        <LocalIcon />
                        <ContentText>
                            {MissionDetail?.sidoCode} {MissionDetail?.gugunCode}
                        </ContentText>
                    </Content>
                </Block>


                <Block>
                    <Content>
                        <LikeAndState />
                    </Content>
                </Block>


                {/* 로그인 시 웹 뷰에서 수정 삭제 버튼 */}
                <Block>
                    <BtnContent>
                        <WebBtn
                            dColor={"#98C064"}
                            hColor={"#65ACE2"}
                            onClick={() => router.push("/mission/createmission")}
                        >수정</WebBtn>

                        <WebBtn
                            hColor={"#98C064"}
                            dColor={"#65ACE2"}
                            onClick={() => router.push("/mission/createmission")}
                        >삭제</WebBtn>
                    </BtnContent>
                </Block>


            </div>
        </>
    )
}



// export async function getServerSideProps(context) {
//     const missiondetail = new QueryClient()
//     const session = await getSession(context);
//     await missiondetail.prefetchQuery(['missions'], () => { missionUserData() })

//     return {
//         props: {
//             data: {
//                 session,
//                 dehydratedState: dehydrate(missiondetail)
//             },
//         },
//     };

// }

