import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ButtonFull } from 'styles/styled';

const ModalDiv = styled('div')`
    position:absolute;
    background-color: white;
    left:0;
    right:0;
    margin-left: auto; 
    margin-right: auto; 
    top:5%;
    width:85%;
    max-width:500px;
    border:0;
    border-radius: 20px;
    z-index:998;
    max-height:90%;
    /* bottom:5%; */
    overflow:auto;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
    
}
`
const ModalHeader = styled('div')`
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    padding:20px 20px 0px 25px;
`
const HeaderTitle = styled('span')`
    font-size:1.5rem;
    font-weight:bold;
    padding: auto;
`
const CloseBtn = styled(CloseRoundedIcon)`
    color:#65ACE2;
`

const ModalBody = styled('div')`
    margin-top:10px;
    display: flex;
    flex-direction: column;
    padding:5px 20px 0px 25px;
    @media only screen and (max-width: 650px) {
        padding:0 20px 0px 20px;
    }
    .inputBtn{
      margin-left:auto;
      margin-right:8px;
    }
`

const CameraBox = styled('form')`
  width: 250px;
  height: 200px;
  background-color: #FFffff;
  border-radius: 15px;
  box-shadow: 0px 0px 5px 0px #dadce0 inset;
  border: 0;
  display:flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 360px){
    width: 200px;
    height: 150px;
  }
`

const MissionText = styled('textarea')`

  border: #65ACE2 solid 2px ;
  background-color: white;
  border-radius: 15px;
  width: 300px;
  height: 100px;
  margin: 20px;
`

const MissionBtn = styled(ButtonFull)`
  padding: 3px 10px;
  border-radius: 10px;
  margin-bottom: 30px;
`

const ModalBack = styled('div')`
    position:absolute;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 997;
    backdrop-filter: blur(5px);
    height:100%;
    width:100%;
    overflow:hidden;
    top:0%;
`

export default function MissionModal(props) {
  const { show, setShow } = props;
  console.log(props.setShow)
  const MissionModalContent = show && (
    <>
      <ModalDiv>
        <ModalHeader>
          <HeaderTitle>
            📸인증해보아요
          </HeaderTitle>
          <CloseBtn onClick={() => setShow(false)} />
        </ModalHeader >
        <ModalBody>

          <IconButton aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" name="file" />
            <CameraBox>
              <PhotoCamera fontSize="large" />
            </CameraBox>
          </IconButton>

          <MissionText placeholder='문구를 입력해 주세요!'></MissionText>

          <div className="inputBtn">
            <MissionBtn dColor='#98C064' hColor='#65ACE2'>등록하기</MissionBtn>
          </div>

        </ModalBody>
      </ModalDiv>
      <ModalBack onClick={() => setShow(false)} />

    </>

  )
  return MissionModalContent
  document.getElementById('MissionModal')
}