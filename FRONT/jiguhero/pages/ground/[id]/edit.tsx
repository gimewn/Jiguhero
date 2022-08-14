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
import putGround from 'pages/api/ground/putGround';
import getPlaceList from 'pages/api/ground/getPlaceList';
import { CloseBtn } from 'components/modal';
import deletePlace from 'pages/api/ground/deletePlace';

const NewPickerDiv = styled(PickerDiv)`
    width:100%;
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
    const [groundEmoji, setGroundEmoji] = useState<string>();
    const [groundTitle, setGroundTitle] = useState<string>();
    const [groundContent, setGroundContent] = useState<string>();
    const [placeList, setPlaceList] = useState([]);
    const [show, setShow] = useState<Boolean>(false);
    const [groundId, setGroundId] = useState();
    const onEmojiClick = (event, emojiObject) => {
        setGroundEmoji(emojiObject.emoji);
        console.log(groundEmoji);
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
    useEffect(()=>{
        if(router.query.id){
            getGround(router.query.id).then(
            (res) => {
                setGroundId(res.groundId)
                setGroundEmoji(res.icon)
                setGroundTitle(res.title)
                setGroundContent(res.content)
            })}}, [])
    useEffect(()=>{
        if(router.query.id && groundId){
            getPlaceList(groundId).then(
                (res) => {setPlaceList(res)}
            )
        }
    })
    useEffect(()=>{
        if(router.query.id && groundId){
            getPlaceList(groundId).then(
                (res) => {setPlaceList(res)
                console.log(placeList)}
            )
        }
    }, [show])

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
           <BackTitle name={'활동구역 수정'} />
            <H2>⚙️ 활동구역 수정</H2>
            <ContentDiv style={{zIndex:'990'}}>
                <Title>구역 이름</Title>
                <Input placeholder={groundTitle} onChange={(e) => {setGroundTitle(e.target.value)}} />
                <Title>구역 설명</Title>
                <Input placeholder={groundContent} onChange={(e) => {setGroundContent(e.target.value)}}  />
                <Title style={{marginBottom:'0px'}}>대표 아이콘</Title>
                {/* <p style={{margin:'5px 0 10px 0'}}></p> */}
                <NewPickerDiv>
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
                </NewPickerDiv>
                <Title>장소 목록</Title>
                <GridEdit>
                    {placeList?.map((item, i) => (
                        <PlaceDiv key={i}>
                            <DeleteBtn 
                            onClick={()=>{
                                if(confirm("삭제하시겠습니까?") == true){
                                    deletePlace(groundId, item.placeId, 1).then((res) => {
                                        if(router.query.id && groundId){
                                            getPlaceList(groundId).then(
                                                (res) => {setPlaceList(res)}
                                            )
                                        }
                                    })
                                    }}}  />
                            <PlaceTitle href={item.url} target="_blank">🔗 {item.name}</PlaceTitle>
                        </PlaceDiv>
                    ))}
                        <PlaceDiv onClick={()=>{onModalClick()}}>
                            <p style={{margin:'0'}}>✖️</p>
                            <p  style={{margin:'15px 0 0 0'}}>장소 추가</p>
                        </PlaceDiv>
                </GridEdit>
                <PostButton dColor="#65ace2" hColor='#98c064' onClick={()=>{
                    putGround(1, groundId, groundEmoji, groundTitle, groundContent).then((res)=>{
                        router.push(`/ground/myground`)
                    }
                    )
                }}> 수정하기 </PostButton>
            </ContentDiv>
        </ParentsDiv>
        <PlaceModal show={show} closeModal={onModalClose} groundId = {groundId} />
        </>
    )
}