import BackTitle from 'components/back';
import {ParentsDiv} from 'styles/styled';
import { H2 } from '..';
import { ContentDiv, PostButton } from '../createground';
import { Title } from '../createground';
import { Input } from '../createground';
import { PickerDiv } from '../createground';
import { EmojiDiv } from '../createground';
import { Picker } from '../createground';
import { Emoji } from '../createground';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getGround from 'pages/api/ground/getGround';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { Grid } from '../myground';
import PlaceModal from 'components/PlaceModal';

const IsActiveDiv = styled('div')`
    .active{
        display:flex !important;
    }
`
const PlaceDiv = styled('div')`
    border: 1px solid #65ace2;
    padding:20px;
    border-radius: 20px;
    margin: 0 10px 20px 10px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const GridEdit = styled(Grid)`
    margin-left:0px;
    margin-right:0px;
`

export default function EditGround(){
    const router = useRouter();
    const [groundEmoji, setGroundEmoji] = useState<string>();
    const [groundTitle, setGroundTitle] = useState<string>();
    const [groundContent, setGroundContent] = useState<string>();
    const [placeList, setPlaceList] = useState<Array<object>>();
    const [show, setShow] = useState<Boolean>(false);
    const onEmojiClick = (event, emojiObject) => {
        setGroundEmoji(emojiObject.emoji);
    }
    useEffect(()=>{getGround(router.query.id).then(
        (res) => {
            setGroundEmoji(res.icon)
            setGroundTitle(res.title)
            setGroundContent(res.content)
            setPlaceList(res.placeIdList)
        })}, [])
        function isActive(){
            if(document.getElementById('picker').classList.contains("active")){
                document.getElementById('picker').classList.remove('active');
            }else{
                document.getElementById('picker').classList.add("active");
            }
        }
    return(
        <ParentsDiv>
           <BackTitle name={'활동구역 수정'} />
            <H2>⚙️ 활동구역 수정</H2>
            <ContentDiv style={{zIndex:'990'}}>
                <Title>구역 이름</Title>
                <Input placeholder={groundTitle} onChange={(e) => {console.log(e.target.value)}} />
                <Title>구역 설명</Title>
                <Input placeholder={groundContent}   />
                <Title style={{marginBottom:'0px'}}>대표 아이콘</Title>
                {/* <p style={{margin:'5px 0 10px 0'}}></p> */}
                <PickerDiv>
                <EmojiDiv onClick={isActive}>
                    {groundEmoji?(
                        <Emoji>{groundEmoji}</Emoji>
                    ):(
                        <></>
                    )}
                </EmojiDiv>
                <IsActiveDiv>
                    <div  id="picker" style={{display:'none'}}>
                    <Picker onEmojiClick={onEmojiClick} pickerStyle={{width:'100%', margin:'10px 0'}} />
                    </div>
                </IsActiveDiv>
                </PickerDiv>
                <Title>장소 목록</Title>
                <GridEdit>
                        <PlaceDiv onClick={()=>{setShow(true)}}>
                            <p style={{margin:'0'}}>✖️</p>
                            <p  style={{margin:'15px 0 0 0'}}>장소 추가</p>
                        </PlaceDiv>
                </GridEdit>
                <PlaceModal show={show} setShow={setShow} />
                <PostButton dColor="#65ace2" hColor='#98c064'> 활동구역 등록 </PostButton>
            </ContentDiv>
        </ParentsDiv>
    )
}