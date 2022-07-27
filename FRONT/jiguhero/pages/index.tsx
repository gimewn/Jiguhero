import GroundFive from 'components/groundTop5'
import {ButtonFull, ButtonBorder} from 'styles/styled';
import Slider from "react-slick";
import styled from 'styled-components';

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

export default function Home(){
  return (
    <>
    <div style={{display:'flex'}}>
      {GroundTopFive.map((item) => (<GroundFive icon={item.icon} title={item.title} />))}
    </div>
    <ButtonFull dColor={'#98C064'} hColor={'#65ACE2'}>버튼을 완성했습니다</ButtonFull>
    <ButtonBorder dColor={'#65ACE2'}>이정도면 되겠죠??</ButtonBorder>
    </>
  )
}