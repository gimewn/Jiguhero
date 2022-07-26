import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MenuForDesk from '../components/MenuBarDesktop';
import MenuForMobile from '../components/MenuBarMobile';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import {createTheme, ThemeProvider} from '@mui/material';

const Header = styled('div')`
  margin:30px;
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

const responStyles = makeStyles(theme => ({
  desktop: {
    [theme.breakpoints.down('sm')]:{
      display: 'none'
    }
  },
  mobile:{
    [theme.breakpoints.up('md')]:{
      display: 'none'
    }
  }
}))

const Home: NextPage = () => {
  const responsive = responStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Header>
          <div className={responsive.desktop}>
            <MenuForDesk />
          </div>
        </Header>
        <h1>Hi</h1>
      </div>
      <Footer>
        <div className={responsive.mobile}>
          <MenuForMobile />
        </div>
      </Footer>
    </ThemeProvider>
  )
}

export default Home