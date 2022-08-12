import {ButtonFull, ParentsDiv} from 'styles/styled';
import BackTitle from 'components/back';
import { H2 } from './index';
import Picker from 'emoji-picker-react';

export default function MakeGround(){
    return(
        <ParentsDiv>
            <BackTitle name={'활동구역 생성'} />
            <H2>🍀 활동구역 생성</H2>
        </ParentsDiv>
    )
}