import styled from 'styled-components';

interface IButton {
    dColor: string;
    hColor: string;
}

export const ButtonFull = styled('button')`
    background-color: ${(props: IButton) => props.dColor};
    border-radius: 15px;
    border: ${(props: IButton) => props.dColor} 1px solid;
    padding:10px;
    color:white;
    :hover, .active{
        background-color: ${(props: IButton) => props.hColor};
        border:${(props: IButton) => props.hColor} 1px solid
    }
    :hover{
    cursor: pointer;
    }
`

export const ButtonBorder = styled('button')`
    border: ${(props: IButton) => props.dColor} solid 1px;
    background-color: white;
    border-radius: 15px;
    padding:10px;
    color:${(props: IButton) => props.dColor};
    :hover, .active{
        color:white;
        background-color: ${(props: IButton) => props.dColor};
        
    }
    :hover{
        cursor: pointer;
    }
`