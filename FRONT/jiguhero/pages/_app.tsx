import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import MenuForDesk from '../component/MenuBarDesktop';
import MenuForMobile from '../component/MenuBarMobile';
import styled from 'styled-components';
import logo from '../public/logo.png';
import Image from 'next/image';
import { useRouter } from "next/router";

const Header = styled('div')`
  display:flex;
  justify-content:space-between;
  margin-bottom:30px;
`

const DeskMenu = styled('div')`
  @media only screen and (max-width: 900px) {
    display:none;
  }
  margin: auto 0;
`

const MobileMenu = styled('div')`
  @media only screen and (min-width: 900px) {
    display:none;
  }
`

const Footer = styled('div')`
  position: fixed;
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
    <RecoilRoot>
        <Header>
          <Image src={logo} width={160} height={40} onClick={() => onLink("/")}/>
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

    </RecoilRoot>

  );
};

export default MyApp
