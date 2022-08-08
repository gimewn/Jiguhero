import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import MenuForDesk from "components/MenuBarDesktop";
import MenuForMobile from "components/MenuBarMobile";
import styled from "styled-components";
import logo from "public/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import Head from 'next/head';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5*60*1000,
    },
  },
});

const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  padding:20px;
  position:fixed;
  left:0;
  right:0;
  z-index:999;
  background-color: white;
`;
const Body = styled("div")`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top:80px;
`;
const Container = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 375px;
  /* max-width:700px; */
  span, p {

    align-items: flex-start;
  }
  div {
    align-items: center;
  }
  @media only screen and (max-width: 650px) {
    margin-bottom:80px;
  }
`

const DeskMenu = styled("div")`
  @media only screen and (max-width: 650px) {
    display: none;
  }
  margin: auto 0;
`;

const Footer = styled('div')`
  min-width:350px;
  height:80px;
  z-index: 999;
  position: absolute;
  bottom:0;
  left:0;
  right:0;
  @media only screen and (min-width: 650px) {
    display:none;
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };
  return (

    <RecoilRoot>
      <Head>
      <link rel="favicon" href="FRONT\jiguhero\public\favicon.ico" />
      <title>지구방위대</title>
      </Head>
      <Header>
        <Image
          src={logo}
          width={160}
          height={40}
          onClick={() => onLink("/")}
          layout="fixed"
        />
        <DeskMenu>
          <MenuForDesk />
        </DeskMenu>
      </Header>
      <Body>
        <Container>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps?.dehydratedState} >
              <SessionProvider session={pageProps?.session}>
                <Component {...pageProps} />
              </SessionProvider>
            </Hydrate>
          </QueryClientProvider>
        </Container>
      </Body>
      <Footer>
        <MenuForMobile />
      </Footer>
    </RecoilRoot>
  );
}

export default MyApp;