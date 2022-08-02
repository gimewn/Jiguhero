import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import MenuForDesk from 'components/MenuBarDesktop'
import MenuForMobile from 'components/MenuBarMobile';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '../public/logo.png';
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';




const Header = styled('div')`
  display:flex;
  justify-content:space-between;
  margin: 20px 20px 0 20px;
`
const Body = styled('div')`
  display:flex;
  justify-content: center;
`
const Container = styled('div')`
  display:flex;
  justify-content: center;
  flex-direction: column;
  min-width:375px;
  max-width:700px;
  span, p {
    align-items: flex-start;
  }
  div{
    align-items: center;
  }
  @media screen and (max-width:414px){
    padding: 0 10px;
  }
`

const DeskMenu = styled('div')`
  @media only screen and (max-width: 650px) {
    display:none;
  }
  margin: auto 0;
`

const MobileMenu = styled('div')`
  @media only screen and (min-width: 650px) {
    display:none;
  }
`

const Footer = styled('div')`
  min-width:350px;
  position: absolute;
  bottom:0;
  left:0;
  right:0;
  background-color: white;
`

function MyApp({ Component, pageProps: { pageProps } }: AppProps) {
  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };
  return (

    <RecoilRoot>
      <Header>
        <Image src={logo} width={160} height={40} onClick={() => onLink("/")} layout='fixed' />
        <DeskMenu>
          <MenuForDesk />
        </DeskMenu>
      </Header>
      <Body>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Body>
      <Footer>
        <MobileMenu>
          <MenuForMobile />
        </MobileMenu>
      </Footer>
    </RecoilRoot>

  );
};

export default MyApp

