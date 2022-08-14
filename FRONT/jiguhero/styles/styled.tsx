import styled from 'styled-components';

interface ColorProp {
    dColor: string,
    hColor?: string
}
export const ButtonFull = styled('button') <{ dColor: string, hColor: string }>`
    background-color: ${(props) => props.dColor};

    border-radius: 15px;
    border: ${(props: ColorProp) => props.dColor} 1px solid;
    padding:10px;
    color:white;
    :hover, .active{

        background-color: ${(props) => props.hColor};
        border:${(props) => props.hColor} 1px solid;
        cursor: pointer;
    }
`

export const ButtonBorder = styled('button') <{ dColor: string }>`
    border: ${(props) => props.dColor} solid 1px;
    background-color: white;
    border-radius: 15px;
    padding:10px;
    color:${(props: ColorProp) => props.dColor};
    :hover, .active{
        color:white;
        background-color: ${(props) => props.dColor};
        cursor: pointer;
    }
`

export const ParentsDiv = styled('div')`
    max-width:700px;
    padding: 0 20px;
<<<<<<< HEAD
    margin: 0 auto;
<<<<<<< HEAD
    width:100%;
=======
    width:100vw;
=======
    margin: 0 auto 20px auto;
    width:100%;
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
    @media only screen and (max-width: 650px) {
        margin-top:20px;
        margin-bottom: 80px;
  }
<<<<<<< HEAD
>>>>>>> c6fd418499a98888cdcdabe4c0d5596a9e51ce3c
=======
  .feedimage{
    position: relative;
    width: 100%;
    height: 100%;
  }
>>>>>>> f77d0a544892c403360790cc1333dd3dd946b22a
`