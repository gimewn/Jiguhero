import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {LocIcon, ConIcon} from 'pages/ecomarket/index';
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded';
import { useState, useEffect } from "react";
import {ButtonFull} from 'styles/styled'
import getReview from 'pages/api/place/getReview';
import postReport from 'pages/api/place/postReport';
import { useQuery } from '@tanstack/react-query';

const ModalBack = styled('div')`
    position:absolute;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    backdrop-filter: blur(5px);
    height:100%;
    width:100%;
    overflow:hidden;
`
const WithIcons = styled('div')`
    display:flex;
    margin-left:0;
    margin-right:auto;
`
const ModalDiv = styled('div')`
    position:absolute;
    background-color: white;
    left:0;
    right:0;
    margin-left: auto; 
    margin-right: auto; 
    top:5%;
    width:80%;
    max-width:700px;
    border:0;
    border-radius: 20px;
    z-index:999;
    overflow:auto;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
    bottom:5%;
    /* @media only screen and (max-width: 650px) {
        height
  } */
    
`
const ModalHeader = styled('div')`
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    padding:20px 20px 0px 25px;
`
const HeaderTitle = styled('span')`
    font-size:1.2rem;
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
        padding:0 20px 20px 20px;
  }
`
const ModalAddress = styled('p')`
    margin: 5px 5px;
    font-size:1rem;
`
const AboutPlace = styled(ModalAddress)`
    border: 1px solid #98c064;
    border-radius: 10px;
    padding:10px;
`

const CallIcon = styled(PermPhoneMsgRoundedIcon)`
font-size: 1em;
color:#98c064;   
`
const ReportBox = styled('div')<{Color:string}>`
    display:flex;
    position:absolute;
    bottom:0;
    width:100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size:1em;
    background-color: ${(props) => props.Color} ;
    padding:10px;
    margin-top:20px;
    p{
        margin: 0;
    }
`
const PostReport = styled(ModalBody)<{Color:string}>`
    background-color: ${(props) => props.Color} ;
    padding-bottom:20px;
    border-radius:20px;
    /* width:80%;
    @media only screen and (max-width: 650px) {
    width: 100%;
  } */
`
const ConTitle = styled('p')`
    font-weight:bold;
    font-size:1rem;
`
const WithTitle = styled('div')`
    display:flex;
    flex-direction: column;
    width:100%;
    *{
        margin-left:0;
        margin-right:auto;
        margin-bottom:5px;
        /* @media only screen and (max-width: 650px) {
            margin-left:0;
            margin-right:0;
        } */
    }
`
const SelectReport = styled('select')`
  -moz-appearance:none;  /* Firefox */
  -webkit-appearance:none;  /* Safari and Chrome */
  appearance:none;  /* 화살표 없애기 공통*/
  padding:10px;
  border-radius:10px;
  font-size:15px;
  margin:10px auto 10px 30px;
  display:inline-block;
  font-size:16px;
  width:80%;
  `
const Textarea = styled('textarea')`
height:100px;
width:80%;
border-radius:10px;
margin: 0px auto 0px 30px;
padding:10px;
`
const ReportButton = styled(ButtonFull)`
width: 80px;
`
const RButtonDiv = styled('div')`
width:160px;
display:flex;
margin-top:20px;
margin-left:auto;
margin-right:15%;
@media only screen and (max-width: 650px) {
    margin-right:10%;
  }

`

// const Hr = styled('hr')`
//     background: #888888;
//     width: 80%;
//     height:1px;
// `

export default function Modal(props){
    const {show, setshow, data, reviews} = props;
    const [isReport, setReport] = useState(false);
    const [ReportCategory, setReportCategory] = useState('');
    const [ReportContent, setReportContent] = useState('');
    console.log(reviews)

    const ModalContent = show && (
        <>
        <ModalDiv>
            <ModalHeader>
                <HeaderTitle>{data.name}</HeaderTitle>
                <CloseBtn onClick={() => setshow(false)}/>
            </ModalHeader>
            <ModalBody>
                {data.roadAddress ? <WithIcons>
                    <LocIcon /><ModalAddress>{data.roadAddress}</ModalAddress>
                </WithIcons> : <></>}
                {data.jibunAddress ? <WithIcons>
                    <LocIcon /><ModalAddress>{data.jibunAddress}</ModalAddress>
                </WithIcons> : <></>}
                {data.phone ? <WithIcons>
                    <CallIcon /><ModalAddress>{data.phone}</ModalAddress>
                </WithIcons> : <></>}
                {data.content ?
                <WithTitle>
                    <ConTitle>🍀 이 곳은 어떤 곳?</ConTitle>
                    <AboutPlace style={{marginLeft:'30px'}}>{data.content}</AboutPlace>
                </WithTitle>
                : <></>}
                <WithTitle>
                    <ConTitle>⭐ 대원들의 리뷰</ConTitle>
                    {/* {reviews?.map((item) => (<div key={item.reviewId}>
                        <p>{item.score}</p>
                    </div>))} */}
                </WithTitle>
            </ModalBody>
            {isReport ? 
            <PostReport Color="white">
            <WithTitle>
            {/* <Hr /> */}
            <ConTitle>🚨 신고 이유를 선택해주세요</ConTitle>
            <SelectReport onChange={(e) => {setReportCategory(e.target.value)}}>
                <option value="">--- 신고 사유 ---</option>
                <option value="1">친환경 관련 가게가 아니에요🧐</option>
                <option value="2">더 이상 영업을 안 해요😧</option>
                <option value="3">기타</option>
            </SelectReport>
                <Textarea placeholder='해당 가게 신고에 대한 의견을 적어 주세요.' onChange={(e)=>{setReportContent(e.target.value)}}></Textarea>
            </WithTitle>
                <RButtonDiv>
                    <ReportButton dColor='#65ACE2' hColor='#65ACE2' style={{margin:'0 10px 0 0'}} onClick={() => setReport(false)}>취소</ReportButton>
                    <ReportButton dColor="#FF4848" hColor="#FF4848" onClick={async () => {
                if(await postReport(data.placeId, 1)==="success"){
                    alert("신고해주셔서 감사합니다.")
                }else{
                    alert("신고가 접수되지 않았습니다!")
                }}}>신고하기</ReportButton>
                </RButtonDiv>
            </PostReport> : 
            <ReportBox Color="#65ACE2" onClick={() => setReport(true)}>
            <ConTitle>신고하기</ConTitle>
            </ReportBox>
        }
            
        </ModalDiv>
        <ModalBack onClick={() => setshow(false)}>
        </ModalBack>
        </>
    )
    return ModalContent
}