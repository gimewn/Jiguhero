import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from 'styled-components';
import { ParentsDiv } from "styles/styled";
import slide from 'public/slide.png';
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination]);

const BannerDiv = styled('div')`
    margin-top:80px;
    background-color: #d4e4fc;
    width:100%;
    height:100%;
    /* @media screen and (max-width: 450px) {
    height: 200px;
  } */
    padding:20px 50px;
    display:flex;
    align-items: center;
    justify-content: center;
`
const Content = styled('div')`
    max-width:1000px;
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* p{
        color:white;
        font-family: 'PyeongChang-Bold';
        font-size:1em;
        margin:10px;
    } */
`
// const Image = styled('img')`
//     max-width: 800px;
//     width:100%;
// `


export default function Banner(){
    return(
        <BannerDiv>
            <Content>
                <Image src={slide} />
            </Content>
        </BannerDiv>
    )
}