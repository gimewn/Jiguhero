import styled from "styled-components";
import { ButtonFull, ButtonBorder } from 'styles/styled';
import Backcomponents from 'components/back';
import Head from 'next/head';
import React, { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useRouter } from 'next/router';
import MissionLIST from "components/MissionLists"

const BackCompo = styled(Backcomponents)`
  margin-top: 10px;
  margin-bottom: 10px;
`
const Block = styled('div')`
  margin: 0.5rem;

`
const Content = styled('div')`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
    @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 550px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    }
`
const ButtonContent = styled('div')`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1.8rem;
      @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 550px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    }
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
  width: 13rem;
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
    @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 550px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    }
`

//select Box
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
        <>
            {/* 헤더 */}
            <Head>
                <title>대원들의 임무 | 지구-방위대</title>
            </Head>

            {/* 모바일 뷰에서 뒤로가기 버튼! */}
            <BackCompo name='대원들의 임무'></BackCompo>

            {/* contents! */}
            {/* 임무 버튼 그룹 */}
            <Block>
                <ButtonContent>
                    <ButtonBox />
                </ButtonContent>
            </Block>

            {/* search Bar */}
            <Block>
                <Content>
                    <SelectBox options={OPTIONS} />
                    <InputBox />
                    <SearchButton />
                </Content>
            </Block>

            {/* 임무 목록들 */}
            <Block>
                <ListContent>
                    <MissionLIST />
                </ListContent>
            </Block>
        </>
    )
}
