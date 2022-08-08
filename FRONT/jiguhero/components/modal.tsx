import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {LocIcon, ConIcon} from 'pages/ecomarket/index';
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded';
import { useState, useEffect } from "react";


const ModalBack = styled('div')`
    position:absolute;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    backdrop-filter: blur(5px);
    height:100%;
    width:100%;
    overflow:hidden;
`
const WithIcons = styled('div')`
    display:flex;
    margin-left:0;
    margin-right:auto;
`
const ModalDiv = styled('div')`
    position:absolute;
    background-color: white;
    padding:20px 20px 20px 25px;
    left:0;
    right:0;
    margin-left: auto; 
    margin-right: auto; 
    top:5%;
    width:80%;
    max-width:700px;
    height:auto;
    border:0;
    border-radius: 20px;
    z-index:999;
`
const ModalHeader = styled('div')`
    display:flex;
    justify-content: space-between;
    flex-direction: row;
`
const HeaderTitle = styled('span')`
    font-size:1.5rem;
    font-weight:bold;
    padding: auto;
`
const CloseBtn = styled(CloseRoundedIcon)`
    color:#65ACE2;
`
const ModalBody = styled('div')`
    margin-top:10px;
    display: flex;
    flex-direction: column;
`
const ModalAddress = styled('p')`
    margin: 5PX 5px;
    font-size:1rem;
`

const CallIcon = styled(PermPhoneMsgRoundedIcon)`
font-size: 1em;
color:#98c064;   
`

export default function Modal(props){
    const {show, setshow, data} = props;
    const [isReport, setReport] = useState();
    const ModalContent = show && (
        <>
        <ModalDiv>
            <ModalHeader>
                <HeaderTitle>{data.name}</HeaderTitle>
                <CloseBtn onClick={() => setshow(false)}/>
            </ModalHeader>
            <ModalBody>
                {data.roadAddress ? <WithIcons>
                    <LocIcon /><ModalAddress>{data.roadAddress}</ModalAddress>
                </WithIcons> : <></>}
                {data.jibunAddress ? <WithIcons>
                    <LocIcon /><ModalAddress>{data.jibunAddress}</ModalAddress>
                </WithIcons> : <></>}
                {data.phone ? <WithIcons>
                    <CallIcon /><ModalAddress>{data.phone}</ModalAddress>
                </WithIcons> : <></>}
                {data.content ? <WithIcons>
                    <ConIcon /><ModalAddress>{data.content}</ModalAddress>
                </WithIcons> : <></>}
            </ModalBody>
        </ModalDiv>
        <ModalBack onClick={() => setshow(false)}>
        </ModalBack>
        </>
    )
    return ModalContent
}