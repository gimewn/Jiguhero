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
import postImg from 'pages/api/place/postImg';
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import getImgList from 'pages/api/place/getImgList';
import deleteReview from 'pages/api/place/deleteReview';
import { useRouter } from "next/router";

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
export const ModalDiv = styled('div')`
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
    overflow:auto;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
`
export const ModalHeader = styled('div')`
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    padding:20px 20px 0px 25px;
`
export const HeaderTitle = styled('span')`
    font-size:1.5rem;
    font-weight:bold;
    padding: auto;
`
export const CloseBtn = styled(CloseRoundedIcon)`
    color:#65ACE2;
`
export const ModalBody = styled('div')`
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
    font-size:15px;
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

const CameraBox = styled("div")`
  width: 150px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 100px;
  /* box-shadow: 0px 0px 5px 0px #dadce0 inset; */
  border: 1px solid #98c064;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
  }
  img {
    object-fit: cover;
    width: 150px;
    height: 150px;
    border-radius: 100px;
  }
`;
const CameraBtn = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  color:#98c064;
  margin: 0 0 20px 0;
  position:relative;
`;
const ImgPostBtn = styled('button')`
    position:absolute;
    z-index:999;
    bottom:20px;
    right:5px;
    border:0;
    border-radius: 30px;
    background-color:#65ACE2;
    padding:15px;
    color:white;
`
const Img = styled('img')`
    width:120px;
    height:120px;
    object-fit: cover;
    margin-bottom:20px;
    border:0;
    border-radius:10px;

`
const DeleteBtn = styled('button')`
    background-color:#FF4848;
    color:white;
    border:0;
    border-radius: 10px;
    padding:3px 10px;
    margin: auto 0 auto 10px;
`

export default function Modal(props) {
    const router = useRouter();
    const { show, setshow, data, reviews, imgList } = props;
    const [fetchReview, setFetchReview] = useState(reviews);
    const [fetchImgList, setFetchImgList] = useState(imgList);
    const [isReport, setReport] = useState(false);
    const [ReportCategory, setReportCategory] = useState(0);
    const [ReportContent, setReportContent] = useState('');
    const reviewEmoji = [['', ''], ['😔', '실망이에요'], ['😑', '별로예요'], ['😶', '그저 그래요'], ['🤗', '만족해요'], ['🥰', '너무 좋아요']]
    const [scoreValue, setsScoreValue] = useState(1);
    const [reviewValue, setReviewValue] = useState('');
    const [placeImg, setPlaceImg] = useState<File>();
    const [preview, setPreview] = useState<string>(); // 이미지 미리보기 사진
    const [userId, setUserId] = useState();
  
    useEffect(()=>{
        if(!localStorage.getItem('access-token')){
            alert("로그인해주세요")
            router.push('/login')
        }else{
            const usersId = JSON.parse(localStorage.getItem('recoil-persist')).userId
            setUserId(usersId)
            // if(data.placeId){
            //     getImgList(data.placeId).then((result) => {setImgList(result.imageURL)
            //     console.log(result)})
            // }
        }
    }, [])

    const changeHandler = (e) => {
        console.log(e.target.files[0])
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
          setPlaceImg(file);
        } else {
            setPlaceImg(null)
        }
      };


      useEffect(() => {
        if(!localStorage.getItem('access-token')){
            alert("로그인해주세요")
            router.push('/login')
        }else{
            if (placeImg) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreview(reader.result as string);
              };
              reader.readAsDataURL(placeImg);
            } else {
              setPreview(null);
            }
            // if(data.placeId){
            //     getImgList(data.placeId).then((result) => setImgList(result.imageURL))
            // }
        }
      }, [placeImg]);

    useEffect(()=>{
        setFetchReview(reviews)
        console.log(reviews)
    }, [reviews])

    useEffect(()=>{
        setFetchImgList(imgList)
        console.log(imgList)
    }, [imgList])

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

    const ModalContent = show && (
        <>
        <ModalDiv>
            <ModalHeader>
                <HeaderTitle>{data.name}</HeaderTitle>
                <CloseBtn onClick={() => setshow(false)}/>
            </ModalHeader>
            <ModalBody>
            <CameraBtn>
                {userId ? 
                    <ImgPostBtn onClick={()=>{postImg(placeImg, data.placeId, userId).then((res)=>{setPlaceImg(null)
                    getImgList(data.placeId).then((res)=>{setFetchImgList(res.imageURL)})})}}>OK</ImgPostBtn>
                : <></>}
            <IconButton aria-label="upload picture" component="label">
                <input
                    hidden
                    accept="image/*"
                    type="file"
                    name="file"
                    onChange={changeHandler}
                />
                {placeImg? (
                    <CameraBox>
                    <img src={preview} />
                    </CameraBox>
                ) : (
                    <CameraBox>
                    <PhotoCamera fontSize="large" style={{color:'#98c064'}}/>
                    </CameraBox>
                )}
                </IconButton>
            </CameraBtn>
                <Swiper
                    spaceBetween={0}
                    slidesPerView="auto"
                    scrollbar={{ draggable: true }}
                    navigation={{
                    nextEl: '.review-swiper-button-next',
                    prevEl: '.review-swiper-button-prev',
                }}>
                    {fetchImgList?.map((item, i)=>(<SwiperSlide key={i}>
                        <Img src={item} />
                    </SwiperSlide>))}
                </Swiper>
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
                    <ConTitle>🧡 대원들의 리뷰</ConTitle>
                    <MakeReview>
                        이 가게의 평점 : ⭐
                        <Select onChange={(e) => {
                            setsScoreValue(Number(e.target.value))}}>
                            {[1, 2, 3, 4, 5].map((item) => (<option value={item} key={item}>{item}</option>))}
                        </Select>
                        <div>
                        <Emoji score={scoreValue} index={0} />
                        <Emoji score={scoreValue} index={1} /> 
                        </div>
                        <ReviewWrite>
                        <ReviewArea placeholder='리뷰를 남겨주세요.' onChange={(e)=>{setReviewValue(e.target.value)
                        }}/>
                        <ReportReview onClick={() => {
                            if(userId){
                                postReview(data.placeId, userId, reviewValue, scoreValue).then((res) => {
                                    getReview(data.placeId).then((res) => {setFetchReview(res)
                                    })})
                            }
                        }} />
                        </ReviewWrite>
                    </MakeReview>
                    <div id='reviews'>
                    {fetchReview?.map((item) => (<ReviewDiv key={item.reviewId}>
                        <Emoji score={item.score} index={0}/>
                    <ReviewBox key={item.reviewId}>
                        <Star score={item.score} />
                        <span>{item.content}</span>
                    {userId == item.userId ? <DeleteBtn onClick={()=>{
                        console.log(true)
                        if(confirm("삭제하시겠습니까?" )=== true){
                            deleteReview(item.reviewId).then((res) => {
                                getReview(data.placeId).then((res) => {setFetchReview(res)
                                })
                            }
                            )
                        }
                    }}>삭제</DeleteBtn> : <></>}
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
            <SelectReport onChange={(e) => {setReportCategory(Number(e.target.value))}}>
                <option value="">--- 신고 사유 ---</option>
                <option value="1">친환경 관련 가게가 아니에요🧐</option>
                <option value="2">더 이상 영업을 안 해요😧</option>
                <option value="3">기타</option>
            </SelectReport>
                <Textarea placeholder='해당 가게 신고에 대한 의견을 적어 주세요.' onChange={(e)=>{setReportContent(e.target.value)}}></Textarea>
            </WithTitle>
                <RButtonDiv>
                    <ReportButton dColor='#65ACE2' hColor='#65ACE2' style={{margin:'0 10px 0 0'}} onClick={() => setReport(false)}>취소</ReportButton>
                    <ReportButton dColor="#FF4848" hColor="#FF4848" onClick={() => {
                        if(userId){
                            postReport(data.placeId, userId, ReportCategory, ReportContent).then((res)=>{setReport(false)})
                        }
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
