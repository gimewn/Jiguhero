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
  @media only screen and (max-width: 600px) {
    display:none;
  }
  margin: auto 0;
`

const MobileMenu = styled('div')`
  @media only screen and (min-width: 600px) {
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
    if (process.browser){
      var navContainer = document.getElementById("NavBar");
      var menus = navContainer.getElementsByClassName("navMenu");
      if(!menus[0].classList.contains('active')){
        var current = document.getElementsByClassName("active"); 
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
          console.log(menus)
          menus[0].className += ' active';
        }
        };  
        }
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
