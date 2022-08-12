import styled from "styled-components";
import { ButtonFull, ButtonBorder } from 'styles/styled';
import Backcomponents from 'components/back';
import Head from 'next/head';
import React, { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useRouter } from 'next/router';
import MissionLIST from "components/MissionLists"
import MissionLIST2 from "components/MissionLists"
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import getMission from "pages/api/mission/index";
import { ParentsDiv } from 'styles/styled'

const Block = styled('div')`
`
const Content = styled('div')`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
    /* @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 550px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    } */
`
const ButtonContent = styled('div')`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* margin-top: 1.8rem; */
      /* @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 550px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    } */

`
const BoxSelect = styled('select')`
    border: #65ACE2 solid 1px;
    background-color: white;
    border-radius: 15px;
    padding:3px;
    margin: 0.5rem;
`
const BoxInput = styled('input')`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  padding:3px;
  width: 12rem;
`
const SearchButton = styled(SearchRoundedIcon)`
    color:#65ACE2;
    margin: 0.5rem;
`
const ButtonGroup = styled("div")`
  button {
    margin: 5px;
  }
`
const ListContent = styled('div')`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom:10px;
    /* @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 550px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    } */
`

const MissionBlock = styled('div')`
    /* display: flex;
    justify-content: center;
    align-items: center;
    width:100%; */
`

// const ContentsWrapper = styled('div')`
//     /* margin-top: 10px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center; */
// `
// const HiWrapper = styled('div')`
//     /* display: flex;
//     justify-content: center;
//     align-items: center; */
//     width:100vw;
// `
// const BottomDiv = styled('div')`
//   margin-bottom: 80px;
// `
//select Box --- 최신등록 순 이름 순 
const OPTIONS = [
    { value: "latest", name: "최신 등록순" },
    { value: "name", name: "이름순" },
];
function SelectBox(props) {
    return (
        <BoxSelect>
            {props.options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.name}
                </option>
            ))}

        </BoxSelect>
    )
}

//input Box
function InputBox() {
    const [text, setText] = useState('')
    const onChange = (event) => {
        setText(event.target.value)
        // console.log(event.target.value)
    }
    return (
        <div>
            <BoxInput
                type="text"
                placeholder='검색어를 입력해주세요.'
                onChange={onChange}
                value={text} />
        </div>
    )
}

//mission Button
function ButtonBox() {
    const router = useRouter();
    return (
        <>
            <ButtonGroup>
                <ButtonFull
                    hColor={"#98C064"}
                    dColor={"#65ACE2"}
                    onClick={() => router.push("/mission/nowjoin")}

                >참여 중인 임무 모아보기</ButtonFull>
                <ButtonFull
                    dColor={"#98C064"}
                    hColor={"#65ACE2"}
                    onClick={() => router.push("/mission/createmission")}
                >임무생성</ButtonFull>
            </ButtonGroup>
        </>
    )
}



//전체 출력 페이지
export default function Mission() {
    return (
        <ParentsDiv>
            {/* 헤더 */}
            <Head>
                <title>대원들의 임무 | 지구-방위대</title>
            </Head>
            {/* 모바일 뷰에서 뒤로가기 버튼! */}
            <Backcomponents name='대원들의 임무'></Backcomponents>

            <Block style={{ marginBottom: '10px', marginTop: '20px' }}>
                <ButtonContent>
                    <ButtonBox />
                </ButtonContent>
            </Block>
            <Block style={{ marginBottom: '10px' }}>
                <Content>
                    <SelectBox options={OPTIONS} />
                    <InputBox />
                    <SearchButton />
                </Content>
            </Block>
            <MissionBlock>
                <ListContent>
                    <MissionLIST />
                    <MissionLIST2 />
                </ListContent>
            </MissionBlock>
        </ParentsDiv>
    )
}


export async function getServerSideProps(context) {
    const missionList = new QueryClient()
    const session = await getSession(context);
    await missionList.prefetchQuery(['mission'], () => { getMission() })

    return {
        props: {
            data: {
                session,
                dehydratedState: dehydrate(missionList)
            },
        },
    };
}