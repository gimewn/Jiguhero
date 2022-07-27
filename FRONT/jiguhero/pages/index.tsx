import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import GroundFive from 'component/groundTop5'
import styled from 'styled-components';
import {ButtonFull, ButtonBorder} from 'styles/styled';

const GroundGroup = styled('div')`
display: flex;
justify-content: center;
`

const GroundTopFive = [
  {
      icon: "🍞",
      title: "비건 취향저격 빵집",
  },
  {
      icon: "🏕🏔",
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
      title: "광주 동명동 #용기내챌린지",
  },
];

export default function Home() {
  return (
    <>
    <GroundGroup>
      {GroundTopFive.map((item) => (<GroundFive icon={item.icon} title={item.title} />))}
    </GroundGroup>
    <ButtonFull dColor={'#98C064'} hColor={'#65ACE2'}>버튼을 완성했습니다</ButtonFull>
    <ButtonBorder dColor={'#65ACE2'}>이정도면 되겠죠??</ButtonBorder>
    </>
  )
}