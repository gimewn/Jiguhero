import Map from 'components/map';
import styled from 'styled-components';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {useRouter} from 'next/router';
import { useState } from 'react';
import Modal from 'components/modal';

const Div = styled('div')`
    position:relative;
`
const Content = styled('div')`
    z-index: 999;
    position:absolute;
    top: 20px;
`
const Title = styled('div')`
    display:flex;
    background-color: white ;
    box-shadow: 0 0 10px #999999;
    padding: 10px 20px;
    border: 0;
    border-radius: 0 20px 20px 0;
    p {
        font-size: 1rem;
        margin-left: 10px;
        font-weight: bold;
    }
    :hover{
        background-color: #D1E5F5;
    }
`
const PlaceGroup = styled('div')`
    position:absolute;
    z-index: 998;
    top:20px;
    right:20px;
    width:inherit;
    height:inherit;
    overflow: auto;
    padding:10px;
`
const Place = styled('div')`
    display:flex;
    background-color: white ;
    box-shadow: 0 0 10px #999999;
    padding: 10px 20px;
    border:0;
    border-radius: 20px;
`
const PlaceTitle = styled('p')`
font-size: 1rem;
font-weight: bold;
`
const Back = styled(ArrowBackIosRoundedIcon)`
    color:#98C064;
`

const Mapping = styled('div')`
    z-index: 1;
    width:100vw;
    height:100rem;
`

export default function FullMap(){
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [choiceP, setChoiceP] = useState([]);
    
    return(
        <Div>
        <Content>
            <Title>
                <Back onClick={() => {router.back()}} />
                <p>내가 정말 아끼는 친환경 가게</p>
            </Title>
        </Content>
        <PlaceGroup>
            <Place onClick={()=>setShow(true)}>
                <PlaceTitle>안녕</PlaceTitle>
            </Place>
        </PlaceGroup>
        <div style={{backgroundColor:'#252525', width:'100%', height:'100%', zIndex:10001}}>
        <Modal show={show} setshow={setShow} header={'알맹상점'}>
            안녕
        </Modal>
        </div>
        <Mapping className='FullMap'>
            <Map />
        </Mapping>
        </Div>
    )
}