import styled from 'styled-components';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ModalDiv = styled('div')`
    background-color: white;
    box-shadow: 0 0 10px #999999;
    padding:20px 20px;
    position:absolute;
    z-index: 1000;
    top:5%;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto;
    width:70%;
    height:auto;
    border:0;
    border-radius: 20px;
`
const ModalHeader = styled('div')`
    display:flex;
    justify-content: space-between;
`
const HeaderTitle = styled('p')`
    font-size:1.5rem;
    font-weight:bold;
    margin:0;
`
const CloseBtn = styled(CloseRoundedIcon)`
    /* margin-left: 20rem; */
    color:#65ACE2;
`
const ModalBody = styled('div')`
`

export default function Modal(props){
    const {show, setshow, header} = props;
    const ModalContent = show && (
        <ModalDiv>
            <ModalHeader>
                <HeaderTitle>알맹상점</HeaderTitle>
                <CloseBtn onClick={() => setshow(false)}/>
            </ModalHeader>
            <ModalBody>
                {props.children}
            </ModalBody>
        </ModalDiv>
    )
    return ModalContent
}