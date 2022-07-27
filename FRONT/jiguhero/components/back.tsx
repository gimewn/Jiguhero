// import Router from 'next/router';
import {useRouter} from 'next/router';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import styled from 'styled-components';
import { useEffect } from 'react';

const Title = styled('div')`
    display:flex;
    align-items: center;
    @media only screen and (min-width: 650px) {
    display:none;
  }
`
const PageTitle = styled('span')`
    font-weight: bold;
    font-size:15px;
    color:#555555;
    margin-left:10px;
`
const BackButton = styled(ArrowBackIosRoundedIcon)`
    color:#98C064;
`
interface PageName{
    name:string;
}

export default function Back({name}:PageName){
    const router = useRouter()
    return(
        <Title>
            <BackButton onClick={() => {router.back()}}/>
            <PageTitle>{name}</PageTitle>
        </Title>
    )
}