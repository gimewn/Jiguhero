import {ButtonFull, ParentsDiv} from 'styles/styled';
import BackTitle from 'components/back';
import { H2 } from './index';
// import Picker from 'emoji-picker-react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import postGround from 'pages/api/ground/postGround';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export const Emoji = styled('span')`
    font-size:50px;
    margin: 10px 0;
`
export const EmojiDiv = styled('div')`
    display:flex;
    justify-content: center;
`
export const Title = styled('p')`
    font-size:18px;
    font-weight:bold;
`
export const ContentDiv = styled('div')`
    margin-left:35px;
    margin-right:40px;
    /* margin-right:auto; */
    /* width:100%; */
`
export const Input = styled('input')`
    border:1px solid #888888;
    border-radius: 10px;
    padding:10px;
    width:90%;
    font-size:15px;
    @media only screen and (max-width: 650px) {
        width:100%;
        margin-rigt:60px;
  }
`
export const PickerDiv = styled('div')`
    display:'flex';
    flex-direction: 'column';
    align-items: baseline;
    width:90%;
    @media only screen and (max-width: 650px) {
            width:100%;
            margin-right:60px;
    }
`
export const PostButton = styled(ButtonFull)`
    font-size: 15px;
    display:flex;
    margin: 20px 0 20px calc(80% - 50px);
    @media only screen and (max-width: 650px) {
        margin: 20px 0 20px auto;
    }
`
export default function MakeGround(){
    const router = useRouter();
    const [groundEmoji, setgroundEmoji] = useState<string>();
    const [groundTitle, setGroundTitle] = useState<string>();
    const [groundContent, setGroundContent] = useState<string>();
    const [userId, setUserId] = useState();
  
    useEffect(()=>{

        const usersId = JSON.parse(localStorage.getItem('recoil-persist')).userId
        setUserId(usersId)
    }, [])

    const onEmojiClick = (event, emojiObject) => {
        setgroundEmoji(emojiObject.emoji);
    }
    return(
        <ParentsDiv>
            <Head>
            <title>활동구역 생성 | 지구-방위대</title>
            </Head>
            <BackTitle name={'활동구역 생성'} />
            <H2>🍀 활동구역 생성</H2>
            <ContentDiv>
                <Title>구역 이름</Title>
                <Input placeholder='구역의 이름을 설정해주세요' onChange={(e) => {setGroundTitle(e.target.value)}} />
                <Title>구역 설명</Title>
                <Input placeholder='구역에 대한 설명을 적어주세요' onChange={(e) => {setGroundContent(e.target.value)}}  />
                <Title style={{marginBottom:'0px'}}>대표 아이콘</Title>
                <p style={{margin:'5px 0 10px 0'}}>활동구역을 대표할 아이콘을 선택해 주세요</p>
                <PickerDiv>
                <EmojiDiv>
                    {groundEmoji?(
                        <Emoji>{groundEmoji}</Emoji>
                    ):(
                        <Emoji style={{fontSize:'18px', margin:'30px 0'}}>아이콘이 선택되지 않았어요</Emoji>
                    )}
                </EmojiDiv>
                <Picker onEmojiClick={onEmojiClick} pickerStyle={{width:'100%', margin:'10px 0'}} />
                </PickerDiv>
                <PostButton dColor="#65ace2" hColor='#98c064' onClick={()=>{
                    if(userId){
                        postGround(userId, groundEmoji, groundTitle, groundContent).then((res) => {
                            router.push(`myground`)
                        }
                        )
                    }
                }}> 활동구역 등록 </PostButton>
            </ContentDiv>
        </ParentsDiv>
    )
}
