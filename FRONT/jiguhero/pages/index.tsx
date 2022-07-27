import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MenuForDesk from '../components/MenuBarDesktop';
import MenuForMobile from '../components/MenuBarMobile';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import {createTheme, ThemeProvider} from '@mui/material';


export default function Home(){
  return (
    <div>
      메인입니다!
    </div>
  )
}