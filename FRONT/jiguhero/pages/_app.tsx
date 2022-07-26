import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import MenuForDesk from '../component/MenuBarDesktop';
import MenuForMobile from '../component/MenuBarMobile';
import styled from 'styled-components';
import {createTheme, Menu, ThemeProvider} from '@mui/material';
import logo from '../public/logo.png';
import Image from 'next/image';

const Header = styled('div')`
  margin:30px;
  display:flex;
  justify-content:space-between;
`

const DeskMenu = styled('div')`
  @media only screen and (max-width: 900px) {
    display:none;
  }
`

const MobileMenu = styled('div')`
  @media only screen and (min-width: 900px) {
    display:none;
  }
`

const Footer = styled('div')`
  position: fixed;
  bottom:0;
  width:100%;

`

const theme = createTheme({
  typography: {
    fontFamily: "'PyeongChang-Bold', 'PyeongChangPeace-Bold'"
  }
})

// const responStyles = makeStyles(theme => ({
//   desktop: {
//     [theme.breakpoints.down('md')]:{
//       display: 'hidden'
//     }
//   },
//   mobile:{
//     [theme.breakpoints.up('md')]:{
//       display: 'hidden'
//     }
//   }
// }))

function MyApp({ Component, pageProps }: AppProps) {

  // const responsive = responStyles();
  
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Header>
          <Image src={logo} width={160} height={40}/>
          <DeskMenu>
            <MenuForDesk />
          </DeskMenu>
        </Header>
        <Component {...pageProps} />
        <Footer>
          <MobileMenu>
            <MenuForMobile />
          </MobileMenu>
        </Footer>
      </ThemeProvider>
    </RecoilRoot>

  );
};

export default MyApp
