import GroundFive from 'components/groundTop5';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination]);

const GroundTopFive = [
    {
        icon: "🍞",
        title: "비건 취향저격 빵집",
    },
    {
        icon: "🌲",
        title: "제주도 친환경 카페",
    },
    {
        icon: "🐣",
        title: "전국구 제로웨이스트샵",
    },
    {
        icon: "🧡",
        title: "내가 애정하는 친환경 카페",
    },
    {
        icon: "🌱",
        title: "광주 동명동 용기내챌린지",
    },
  ];
  
  export default function ShowGround5(){
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
        750: {
            slidesPerView: 5,
          }
      }}
        >
            {GroundTopFive.map((item) => (<SwiperSlide><GroundFive icon={item.icon} title={item.title} /></SwiperSlide>))}
        </Swiper>
        <i className="icon-arrow-long-right review-swiper-button-next"></i>
        <i className="icon-arrow-long-left review-swiper-button-prev"></i>
        </>
    )
}