import Backcomponents from 'components/back';
import Head from 'next/head';
import styled from 'styled-components';
import { ParentsDiv } from 'styles/styled'
import { ButtonFull, ButtonBorder } from "styles/styled";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const H2 = styled('h2')`
  @media only screen and (max-width: 650px) {
    display:none;
  }
`
const NewsTop = styled('div')`
    @media screen and (min-width: 650px){
        margin-left:35px;
        margin-right: 35px;
    }
    @media screen and (max-width: 650px) {
        margin-top:30px;
        
    }
`

const Title = styled('h3')`
  margin: 8px 0px 8px 0px;
`
const TitleInput = styled('input')`
  width: 100%;
  border-radius: 10px;
  border: 1px solid #65ACE2;
  padding: 5px;
`
const TextInput = styled('textarea')`
  width: 100%;
  border-radius: 10px;
  border: 1px solid #65ace2;
  height: 140px;
  @media screen and (max-width: 375px) {
    height: 50px;
  }
`

const CategorySelect = styled("select")`
  border: #65ace2 solid 1px;
  background-color: white;
  border-radius: 15px;
  padding: 5px;
  width: 100%;
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
`;

const SubmitBtn = styled(ButtonFull)`
  width: 100%;
  font-size: medium;
  
`
const CameraBox = styled("form")`
  width: 300px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 0px 5px 0px #dadce0 inset;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 360px) {
    width: 200px;
    height: 150px;
  }
  img {
    object-fit: cover;
    width: 300px;
    height: 200px;
    border-radius: 15px;
  }
`;
const CameraBtn = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const ContentDiv = styled('div')`
  margin: 0rem 2rem;
`

export default function CreateNews() {
  //카테고리 select
  const [cate, setCate] = useState('');
  const OPTIONS = [
    { value: '1', name: "프로모션" },
    { value: '2', name: "뉴스" },
  ];

  // 미션 사진 등록
  const [createImg, setCreateimg] = useState<File>(null); // 이미지 파일
  const [preview, setPreview] = useState<string>(); // 이미지 미리보기 사진
  function MissionPicture() {
    const changeHandler = (e) => {
      const file = e.target.files[0];
      if (file && file.type.substr(0, 5) === "image") {
        setCreateimg(e.target.files[0]);
      } else {
        setCreateimg(null);
      }
    };
    useEffect(() => {
      if (createImg) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(createImg);
      } else {
        setPreview(null);
      }
    }, [createImg]);

    return (
      <CameraBtn>
        <IconButton aria-label="upload picture" component="label">
          <input
            hidden
            accept="image/*"
            type="file"
            name="file"
            onChange={changeHandler}
          />

          {createImg ? (
            <CameraBox>
              <img src={preview} />
            </CameraBox>
          ) : (
            <CameraBox>
              <PhotoCamera fontSize="large" />
            </CameraBox>
          )}
        </IconButton>
      </CameraBtn>
    );
  }

  return (
    <ParentsDiv>
      {/* 헤더 */}
      <Head>
        <title>지구-방위대 소식 | 지구-방위대</title>
      </Head>
      {/* 방위대 소식 back버튼 */}
      <Backcomponents name='소식 등록'></Backcomponents>
      <NewsTop>
        <H2>🦸🏻 지구-방위대 소식 등록</H2>

        <ContentDiv>
          <Title>제목</Title>
          <TitleInput></TitleInput>
          <Title>카테고리</Title>
          <CategorySelect
            onChange={(e) => {
              e.preventDefault()
              setCate(e.target.value);
            }}>{OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>{item.name}</option>))}</CategorySelect>
          <Title>내용</Title>
          <TextInput />
          <Title>이미지</Title>
          <MissionPicture />
          <SubmitBtn dColor='#65ace2' hColor=' #98C064'>등록</SubmitBtn>
        </ContentDiv>

      </NewsTop>
    </ParentsDiv>
  )
}

