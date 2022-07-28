import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import MenuForDesk from '../components/MenuBarDesktop';
import MenuForMobile from '../components/MenuBarMobile';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '../public/logo.png';
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from '@mui/material';

//MUI component에 font 적용을 위함
const theme = createTheme({
  typography: {
    fontFamily: [
      'PyeongChang',
    ].join(','),
  },
});


const Header = styled('div')`
  display:flex;
  justify-content:space-between;
  margin: 20px;
`

const Container = styled('div')`
  margin: 30px;
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
  position: absolute;
  bottom:0;
  left:0;
  right:0;
`

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Header>
          <Image src={logo} width={160} height={40} onClick={() => onLink("/")} layout='fixed' />
          <DeskMenu>
            <MenuForDesk />
          </DeskMenu>
        </Header>
        <Container>
          <Component {...pageProps} />
        </Container>
        <Footer>
          <MobileMenu>
            <MenuForMobile />
          </MobileMenu>
        </Footer>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default MyApp
