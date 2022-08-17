import GroundFive from 'components/groundTop5';
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import getGround from 'pages/api/main/ground';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";


SwiperCore.use([Navigation, Pagination]);
  
export default function ShowGround5(){
    const {data:groundData} = useQuery(['ground'], getGround)
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
        {groundData?.map((item) => (<SwiperSlide key={item.groundId}><GroundFive icon={item.icon} title={item.title} id={item.groundId}/></SwiperSlide>))}
        </Swiper>
        <i className="icon-arrow-long-right review-swiper-button-next"></i>
        <i className="icon-arrow-long-left review-swiper-button-prev"></i>
        </>
    )
}
export async function getServerSideProps(context) {
    const ground2 = new QueryClient()

    await ground2.prefetchQuery(['ground'], ()=>{getGround()})
  
      return {
        props: {
          data: {

            dehydratedState: dehydrate(ground2)
          },
        },
      };   
  }
