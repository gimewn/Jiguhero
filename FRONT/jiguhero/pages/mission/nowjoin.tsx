import styled from "styled-components";
import NowJoin from "components/NowJoinLists"
import Head from 'next/head';
import Backcomponents from 'components/back';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import React, { useState } from 'react';

const NavBar = styled('div')`
  z-index: 999;
 position: fixed;
  left: 0;
  right: 0;
  top:60px;
  height: 60px;
  /* padding: 2rem; */
  color: white;
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
  width: 13rem;
`

const SearchButton = styled(SearchRoundedIcon)`
    color:#65ACE2;
    margin: 0.5rem;
`

const Div = styled('div')`
    padding: 20px;
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
        <div>

            <Head>
                <title>대원들의 임무 | 지구-방위대</title>
            </Head>

            <NavBar>
                <Header>
                    {/* 모바일 뷰에서 뒤로가기 버튼! */}
                    <BackCompo name='참여 중인 임무 모아보기'></BackCompo>
                </Header>
            </NavBar>

            <Div></Div>

            <Block>
                <Content>
                    <SelectBox options={OPTIONS} />
                    <InputBox />
                    <SearchButton />
                </Content>
            </Block>

            <MissionBlock>
                <ListContent>
                    <NowJoin />
                </ListContent>
            </MissionBlock>
        </div>
    )

}