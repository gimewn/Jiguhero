// import Router from 'next/router';
import { useRouter } from 'next/router';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import styled from 'styled-components';
import { useEffect } from 'react';


const NavBar = styled('div')`
  z-index: 999;
 position: fixed;
  left: 0;
  right: 0;
  top:60px;
  height: 60px;
  /* padding: 2rem; */
  color: white;
  background: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
    @media only screen and (min-width: 650px) {
    display:none;
  }
`
const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  /* margin: 0px 5px 0px 20px; */
`;

const Title = styled('div')`
    display:flex;
    align-items: center;
    @media only screen and (min-width: 650px) {
    display:none;
  }
  margin-left:20px;
`
const PageTitle = styled('span')`
    font-weight: bold;
    font-size:15px;
    color:#555555;
    margin-left:10px;
`
const BackButton = styled(ArrowBackIosRoundedIcon)`
    color:#98C064;
    :hover{
        cursor: pointer;
    }
`
interface PageName {
    name: string;
}

export default function Back({ name }: PageName) {
    const router = useRouter()
    return (
        <NavBar>
            <Header>
                <Title className="BackTitle">
                    <BackButton onClick={() => { router.back() }} />
                    <PageTitle>{name}</PageTitle>
                </Title>
            </Header>
        </NavBar>
    )
}