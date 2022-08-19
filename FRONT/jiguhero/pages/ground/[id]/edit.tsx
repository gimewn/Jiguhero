import BackTitle from 'components/back';
import {ParentsDiv} from 'styles/styled';
import { H2 } from '..';
import { ContentDiv, PostButton } from '../createground';
import { Title } from '../createground';
import { Input } from '../createground';
import { PickerDiv } from '../createground';
import { EmojiDiv } from '../createground';
import { Emoji } from '../createground';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getGround from 'pages/api/ground/getGround';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { Grid } from '../myground';
import PlaceModal from 'components/PlaceModal';
import putGround from 'pages/api/ground/putGround';
import getPlaceList from 'pages/api/ground/getPlaceList';
import dynamic from 'next/dynamic';
import { CloseBtn } from 'components/modal';
import { useRecoilState } from "recoil";
import deletePlace from 'pages/api/ground/deletePlace';
import { groundDetail } from 'states/ground';
import {groundPlaceList} from 'states/ground';
import Head from 'next/head';
export const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const NewPickerDiv = styled(PickerDiv)`
    width:100%;
`
const EditButton = styled(PostButton)`
    margin: 20px 0 20px auto;
    @media only screen and (max-width: 650px) {
        margin: 10px 0 20px 70%;
    }
`

const IsActiveDiv = styled('div')`
    .active{
        display:flex !important;
    }
`
const PlaceDiv = styled('div')`
    border: 1px solid #65ace2;
    padding:20px;
    border-radius: 20px;
    margin: 10px 10px 20px 10px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:80%;
    position:relative;
`
export const DeleteBtn = styled(CloseBtn)`
    position:absolute;
    top:10px;
    right:10px;
`

const PlaceTitle = styled('a')`
    word-break: keep-all;
    text-align: center;
    margin: 15px 0;
`
const GridEdit = styled('div')`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    @media only screen and (max-width: 650px) {
        grid-template-columns: repeat(2, 1fr);
  }
    margin-top:20px;
    margin-left:0px;
    margin-right:0px;
`

export default function EditGround(){
    const router = useRouter();
    const [ground, setGround] = useRecoilState(groundDetail);
    const [placeList, setPlaceLists] = useRecoilState(groundPlaceList);
    const [groundEmoji, setGroundEmoji] = useState("");
    const [groundTitle, setGroundTitle] = useState("");
    const [groundContent, setGroundContent] = useState("");
    const [show, setShow] = useState<Boolean>(false);
    const [groundId, setGroundId] = useState("");
    const [userId, setUserId] = useState();
  
    useEffect(()=>{

        if(router.query.id){
            const usersId = JSON.parse(localStorage.getItem('recoil-persist')).userId
            setUserId(usersId)
            getGround(router.query.id).then(
            (res) => {setGround(res)
                setGroundTitle(res.title)
                setGroundContent(res.content)
                setGroundEmoji(res.icon)
            })
            if(ground.groundId){
                getPlaceList(ground.groundId).then(
                    (res) => {
                        setPlaceLists(res)
                }
                )
            }
        }}, [])
    useEffect(()=>{
        if(ground.groundId){
            getPlaceList(ground.groundId).then((res)=>{
            setPlaceLists(res)})
        }
    }, [placeList])

    // useEffect(()=>{
    //     if(router.query.id && groundId){
    //         getPlaceList(groundId).then(
    //             (res) => {setPlaceLists(res)}
    //         )
    //     }
    // }, [show])

    const onEmojiClick = (event, emojiObject) => {
        setGroundEmoji(emojiObject.emoji);
    }

    function onModalClick(){
        setShow(true)
        window.scrollTo(0, 0);
        document.body.style.overflow="hidden";
    }

    function onModalClose(){
        setShow(false)
        document.body.style.overflow="unset";
    }

    function isActive(){
        if(document.getElementById('picker').classList.contains("active")){
            document.getElementById('picker').classList.remove('active');
        }else{
            document.getElementById('picker').classList.add("active");
        }
    }
    
    return(
        <>
        <ParentsDiv>
        <Head>
        <title>활동구역 수정 | 지구-방위대</title>
        </Head>
        <BackTitle name={'활동구역 수정'} />
        <H2>⚙️ 활동구역 수정</H2>
        <ContentDiv style={{zIndex:'990'}}>
            <Title>구역 이름</Title>
            <Input type="text" defaultValue={groundTitle} onChange={(e) => {setGroundTitle(e.target.value)}} />
            <Title>구역 설명</Title>
                <Input type="text" defaultValue={groundContent} onChange={(e) => {setGroundContent(e.target.value)}}  />
            <Title style={{marginBottom:'0px'}}>대표 아이콘</Title>
            <NewPickerDiv>
            <EmojiDiv onClick={isActive}>
                    <Emoji>{groundEmoji}</Emoji>
            </EmojiDiv>
            <IsActiveDiv>
                <div  id="picker" style={{display:'none'}}>
                <Picker onEmojiClick={onEmojiClick} pickerStyle={{width:'100%', margin:'10px 0'}} />
                </div>
            </IsActiveDiv>
            </NewPickerDiv>
            <Title>장소 목록</Title>
            <GridEdit>
                {placeList ? 
                <>
                {placeList?.map((item, i) => (
                    <PlaceDiv key={i}>
                       <DeleteBtn 
                        onClick={()=>{
                            if(confirm("삭제하시겠습니까?") == true && userId){
                                deletePlace(ground.groundId, item.placeId, userId).then((res) => {
                                    if(router.query.id && ground.groundId){
                                        getPlaceList(ground.groundId).then(
                                            (res) => {
                                                setPlaceLists(res)}
                                        )
                                    }
                                })
                                }}}  />
                        <PlaceTitle href={item.url} target="_blank">🔗 {item.name}</PlaceTitle>
                    </PlaceDiv>
                ))}
                </>
            : <></>}
                    <PlaceDiv onClick={()=>{onModalClick()}}>
                        <p style={{margin:'0'}}>✖️</p>
                        <p  style={{margin:'15px 0 0 0'}}>장소 추가</p>
                    </PlaceDiv>
            </GridEdit>
            <EditButton dColor="#65ace2" hColor='#98c064' onClick={()=>{
                if (userId){
                    putGround(userId, ground.groundId, groundEmoji, groundTitle, groundContent).then((res)=>{
                        router.push(`/ground/myground`)
                    }
                    )
                }
            }}> 수정하기 </EditButton>
        </ContentDiv>
    </ParentsDiv>
    <PlaceModal show={show} closeModal={onModalClose} groundId = {ground.groundId} />
        </>
    )}