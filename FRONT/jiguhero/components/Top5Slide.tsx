import GroundFive from 'components/groundTop5';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import {useQuery} from '@tanstack/react-query';
import {Token, BASE_URL} from 'pages/api/fetch';

SwiperCore.use([Navigation, Pagination]);
  
export default function ShowGround5(){
    const getGround = async() => {
        return (await fetch(BASE_URL+'home/ground', {
            method:'get',
            headers:{
                Authorization : Token
            }
        })).json()
    }
    const {data} = useQuery(['ground'], getGround)
    return(
        <>
        <Swiper
        spaceBetween={0}
        slidesPerView={5}
        scrollbar={{ draggable: true }}
        navigation={{
        nextEl: '.review-swiper-button-next',
        prevEl: '.review-swiper-button-prev',
      }}
      breakpoints={{
        350:{
            slidesPerView:2,
        },
        550:{
            slidesPerView:3,
        },
        600:{
            slidesPerView:4,
        },
        800: {
            slidesPerView: 5,
          }
      }}
        >
        {data?.map((item) => (<SwiperSlide key={item.groundId}><GroundFive icon={item.icon} title={item.title} id={item.groundId}/></SwiperSlide>))}
        </Swiper>
        <i className="icon-arrow-long-right review-swiper-button-next"></i>
        <i className="icon-arrow-long-left review-swiper-button-prev"></i>
        </>
    )
}