import styled from 'styled-components';
interface ColorProp{
    dColor:string,
    hColor:string
}
export const ButtonFull = styled('button')<{dColor:string, hColor:string}>`
    background-color: ${(props) => props.dColor};
    border-radius: 15px;
    border: ${(props) => props.dColor} 1px solid;
    padding:10px;
    color:white;
    :hover, .active{
        background-color: ${(props) => props.hColor};
        border:${(props) => props.hColor} 1px solid;
        cursor: pointer;
    }
`

export const ButtonBorder = styled('button')<{dColor:string}>`
    border: ${(props) => props.dColor} solid 1px;
    background-color: white;
    border-radius: 15px;
    padding:10px;
    color:${(props) => props.dColor};
    :hover, .active{
        color:white;
        background-color: ${(props) => props.dColor};
        cursor: pointer;
    }
`