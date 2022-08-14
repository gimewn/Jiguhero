import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LocIcon, ConIcon } from 'pages/ecomarket/index';
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded';
import { useState, useEffect } from "react";
import { ButtonFull } from 'styles/styled'
import getReview from 'pages/api/place/getReview';
import postReport from 'pages/api/place/postReport';
import postReview from 'pages/api/place/postReview';
import { useQuery } from '@tanstack/react-query';
// import { Pagination } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { reviewlists } from 'states/place';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination]);

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
    width:85%;
    max-width:700px;
    border:0;
    border-radius: 20px;
    z-index:999;
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
const ReportBox = styled('div') <{ Color: string }>`
    display:flex;
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
const PostReport = styled(ModalBody) <{ Color: string }>`
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

const ReviewDiv = styled('div')`
display:flex;
margin-left:30px;
`
const ReviewBox = styled('div')`
    background-color:white;
    border:1px solid #65ACE2;
    border-radius: 20px;
    padding:10px 15px;
    margin-left:10px;
    margin-top:10px;
    span{
        margin-top: auto;
        margin-bottom:auto;
    }
`

const EmojiSpan = styled('span') <{ size: string }>`
    font-size: ${(props) => props.size};
    margin: auto 5px auto 0;
    `
const Starspan = styled('span')`
    margin-right:10px;
`

// const Paging = styled(Pagination)`
//     margin: 0 auto;
// `
const MakeReview = styled('div')`
    margin-left:30px;
    margin-top:10px;
    width:90%;
`
const Select = styled('select')`
    border: 1px solid #98c064;
    padding:5px;
    width:30px;
    margin-left:5px;
    -moz-appearance:none;  /* Firefox */
  -webkit-appearance:none;  /* Safari and Chrome */
  appearance:none;  /* 화살표 없애기 공통*/
  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
  padding: 5px 10px;
`
const ReviewArea = styled('textarea')`
    height:45px;
    width:80%;
    border-radius:10px;
    /* margin: 0px 10px 0px 30px; */
    padding:10px;
    margin:0;
`
const ReviewWrite = styled('div')`
    margin-top:10px;
    display:flex;
    justify-content: start;
    align-items: center;
`
const ReportReview = styled(CheckRoundedIcon)`
    /* margin-top:5px; */
    color:white;
    background-color: #98c064;
    margin: auto 10px;
    border:0;
    border-radius: 20px;
    padding:5px;
    height:35px;
    width:35px;
`
const ImageDiv = styled('div')``

export default function Modal(props) {
    const { show, setshow, data, reviews } = props;
    const [isReport, setReport] = useState(false);
    const [ReportCategory, setReportCategory] = useState(0);
    const [ReportContent, setReportContent] = useState('');
    const reviewEmoji = [['', ''], ['😔', '실망이에요'], ['😑', '별로예요'], ['😶', '그저 그래요'], ['🤗', '만족해요'], ['🥰', '너무 좋아요']]
    const [scoreValue, setsScoreValue] = useState(1);
    const [reviewValue, setReviewValue] = useState('');
    const page = useRecoilValue(reviewlists)
    const setPage = useSetRecoilState(reviewlists)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const [fetchReview, setFetchReview] = useState(reviews);
    useEffect(() => {
        setFetchReview(reviews)
    }, [reviews])
    function Emoji(prop) {
        if (prop['index'] === 0) {
            return (<EmojiSpan size="20px">{reviewEmoji[prop['score']][prop['index']]}</EmojiSpan>)
        } else {
            return (<EmojiSpan size="16px">{reviewEmoji[prop['score']][prop['index']]}</EmojiSpan>)
        }
    }
    function Star(score) {
        let res = '';
        for (let i = 0; i < score['score']; i++) {
            res += '⭐'
        }
        return <Starspan>{res}</Starspan>
    }
    console.log(data)
    const ModalContent = show && (
        <>
            <ModalDiv>
                <ModalHeader>
                    <HeaderTitle>{data.name}</HeaderTitle>
                    <CloseBtn onClick={() => setshow(false)} />
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
                    <ImageDiv>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={5}
                            scrollbar={{ draggable: true }}
                            navigation={{
                                nextEl: '.review-swiper-button-next',
                                prevEl: '.review-swiper-button-prev',
                            }}>
                            {data.imageURL.map((item) => (<SwiperSlide></SwiperSlide>))}
                        </Swiper>
                    </ImageDiv>
                    {data.content ?
                        <WithTitle>
                            <ConTitle>🍀 이 곳은 어떤 곳?</ConTitle>
                            <AboutPlace style={{ marginLeft: '30px' }}>{data.content}</AboutPlace>
                        </WithTitle>
                        : <></>}
                    <WithTitle>
                        <ConTitle>🧡 대원들의 리뷰</ConTitle>
                        <MakeReview>
                            이 가게의 평점 : ⭐
                            <Select onChange={(e) => {
                                setsScoreValue(Number(e.target.value))
                            }}>
                                {[1, 2, 3, 4, 5].map((item) => (<option value={item} key={item}>{item}</option>))}
                            </Select>
                            <div>
                                <Emoji score={scoreValue} index={0} />
                                <Emoji score={scoreValue} index={1} />
                            </div>
                            <ReviewWrite>
                                <ReviewArea placeholder='리뷰를 남겨주세요.' onChange={(e) => {
                                    setReviewValue(e.target.value)
                                }} />
                                <ReportReview onClick={() => {
                                    postReview(data.placeId, 1, reviewValue, scoreValue).then((res) => {
                                        getReview(data.placeId).then((res) => {
                                            setFetchReview(res)
                                        })
                                    })
                                }} />
                            </ReviewWrite>
                        </MakeReview>
                        <div id='reviews'>
                            {fetchReview?.map((item) => (<ReviewDiv key={item.reviewId}>
                                <Emoji score={item.score} index={0} />
                                <ReviewBox key={item.reviewId}>
                                    <Star score={item.score} />
                                    <span>{item.content}</span>
                                </ReviewBox>
                            </ReviewDiv>
                            ))}
                        </div>
                    </WithTitle>
                </ModalBody>
                {isReport ?
                    <PostReport Color="white">
                        <WithTitle>
                            <ConTitle>🚨 신고 이유를 선택해주세요</ConTitle>
                            <SelectReport onChange={(e) => { setReportCategory(Number(e.target.value)) }}>
                                <option value="">--- 신고 사유 ---</option>
                                <option value="1">친환경 관련 가게가 아니에요🧐</option>
                                <option value="2">더 이상 영업을 안 해요😧</option>
                                <option value="3">기타</option>
                            </SelectReport>
                            <Textarea placeholder='해당 가게 신고에 대한 의견을 적어 주세요.' onChange={(e) => { setReportContent(e.target.value) }}></Textarea>
                        </WithTitle>
                        <RButtonDiv>
                            <ReportButton dColor='#65ACE2' hColor='#65ACE2' style={{ margin: '0 10px 0 0' }} onClick={() => setReport(false)}>취소</ReportButton>
                            <ReportButton dColor="#FF4848" hColor="#FF4848" onClick={() => {
                                postReport(data.placeId, 1, ReportCategory, ReportContent).then((res) => { setReport(false) })
                            }}>신고하기</ReportButton>
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