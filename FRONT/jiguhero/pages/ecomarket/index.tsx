import Map from 'components/map';
import styled from 'styled-components';

const Mapping = styled('div')`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content: center;
    align-items: center;
`

export default function FullMap(){
    return(
        <Mapping className='FullMap'>
            <Map/>
        </Mapping>
    )
}