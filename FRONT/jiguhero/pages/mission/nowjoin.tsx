import styled from "styled-components";
import NowJoin from "components/NowJoinLists"
import Head from 'next/head';
import Backcomponents from 'components/back';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import React, { useState } from 'react';
import { ParentsDiv } from 'styles/styled'


const Block = styled('div')`
`
const Content = styled('div')`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ListContent = styled('div')`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom:10px;
`

const MissionBlock = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
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

const Div = styled('div')`
    padding: 20px;
    @media only screen and (min-width: 650px) {
    display:none;
  }
`

const H2 = styled('h2')`
  @media only screen and (max-width: 650px) {
    display:none;
  }
`
const MissionTop = styled('div')`
margin-left:35px;
@media only screen and (max-width: 650px) {
    margin-top:20px;
  }
`
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


export default function Mission() {
    return (
        <ParentsDiv>
            <Head>
                <title>참여 중인 임무 | 지구-방위대</title>
            </Head>
            {/* 모바일 뷰에서 뒤로가기 버튼! */}
            <Backcomponents name='참여 중인 임무 모아보기'></Backcomponents>

            <Div></Div>
            <MissionTop>
                <H2>🦸🏻 참여 중인 임무</H2>
            </MissionTop>
            <Block style={{ marginBottom: '10px' }}>
                <Content>
                    <SelectBox options={OPTIONS} />
                    <InputBox />
                    <SearchButton />
                </Content>
            </Block>

            {/*components의 NowJoinList와 NowJoinLists는 api joinMission.ts에서
                        //데이터를 받아오는데 api 더미가 없어서 임시로 대원들의 임무리스트에서 확인함.*/}
            <MissionBlock>
                <ListContent>
                    <NowJoin />
                </ListContent>
            </MissionBlock>

        </ParentsDiv>
    )

}