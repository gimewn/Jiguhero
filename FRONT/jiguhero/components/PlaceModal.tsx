import {ModalHeader, HeaderTitle, CloseBtn, ModalBody} from 'components/modal';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Input } from 'pages/ground/createground';
import { ButtonFull } from 'styles/styled';
import Link from 'next/link';
import postPlace from 'pages/api/place/postPlace';
import postGroundPlace from 'pages/api/ground/postGroundPlace';

const PModalBack = styled('div')`
    position:absolute;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 998;
    backdrop-filter: blur(5px);
    height:100vh;
    width:100%;
    overflow:hidden;
    top:0;
    left:0;
    right:0;
    /* left:0; */
`
export const ModalDiv = styled('div')`
    position:absolute;
    background-color: white;
    left:0;
    right:0;
    margin-left: auto; 
    margin-right: auto; 
    top:5%;
    @media only screen and (max-width: 650px) {
        top:10%;
  }
    width:85%;
    max-width:650px;
    border:0;
    border-radius: 20px;
    z-index:999;
    padding: 10px 20px 40px 20px;
    height:85vh;
    @media only screen and (max-width: 650px) {
      height:70vh;
  }
  @media only screen and (max-height: 750px) {
      height:65vh;
  }
  @media only screen and (max-height: 670px) {
      height:60vh;
  }
  
    bottom:5%;
    overflow:auto;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}`
const Form = styled('form')`
  width:90%;
  @media only screen and (max-width: 650px) {
      width:100%;
  }
  display:flex;
  justify-content: center;
  padding: 10px 0 0 0;
`
const ResultItem = styled('div')`
  width:450px;
  @media only screen and (max-width: 650px) {
      width:250px;
  }
  display:block;
  max-width:500px;
  border:1px solid #65ace2;
  border-radius: 20px;
  margin: 0 auto;
  padding:20px 20px;
`
const ResultItemHeader = styled('div')`
  display:flex;
  justify-content: flex-start;
  margin-bottom:10px;
`
const ResultItemHNum = styled('div')`
  border:0;
  border-radius: 30px;
  background-color:#98c064;
  padding:10px;
  width:30px;
  height:30px;
  display:flex;
  justify-content: center;
  align-items: center;
  span{
    color:white;
    font-weight:bold;
  }
`
const ResultItemHTitle = styled('span')`
  font-size:17px;
  font-weight:bold;
  margin: auto 0 auto 10px;
`
const ResultItemContent = styled('p')`
  margin: 15px 0 0 0;
`
const Pagination = styled('div')`
  display:flex;
  justify-content: center;
  margin-top:25px;
  a{
    color: black;
  text-decoration: none;
  margin: 0 10px;
  background-color:#999999;
  color:white;
  font-size:15px;
  width:30px;
  height:30px;
  border:0;
  border-radius: 20px;
  padding:10px;
  display:flex;
  justify-content: center;
  align-items: center;
}
  .on{
    background-color:#65ace2;
  color:white;
  font-size:15px;
  width:30px;
  height:30px;
  border:0;
  border-radius: 20px;
  padding:10px;
  display:flex;
  justify-content: center;
  align-items: center;
  }
`
const ChoiceDiv = styled('div')`
width:90%;
@media only screen and (max-width: 450px) {
      width:100%;
  }
margin-top:30px;
border:1px solid #65ace2;
border-radius: 20px;
padding:20px;
`
const ChoiceTitle = styled('div')`
  font-weight: bold;
  font-size:25px;
`
const ChoiceContent = styled('div')`
  margin: 10px auto;
`
const ButtonDiv = styled('div')`
  margin-top:10px;
  display:flex;
  justify-content: flex-end;
`

export default function PlaceModal(prop){
    const {show, closeModal, groundId} = prop;
    const [Places, setPlaces] = useState([])
    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')
    const [choicePlace, setChociePlace] = useState({
      "address_name": "",
      "id": "",
      "phone": "",
      "place_name": "",
      "place_url": "",
      "road_address_name": "",
    });
    const [showResultList, setShowResultList] = useState(true);

    const [userId, setUserId] = useState();
  
    useEffect(()=>{
        const usersId = JSON.parse(localStorage.getItem('recoil-persist')).userId
        setUserId(usersId)
    }, [])


     const onChange = (e) => {
        setInputText(e.target.value)
      }
    
      const handleSubmit = (e) => {
        console.log(e)
        e.preventDefault()
        setPlace(InputText)
        setInputText('')
        setShowResultList(true)
      }

  
      function placesSearchCB(data, status, pagination) {
        if (status === window.kakao.maps.services.Status.OK) {
  
          for (let i = 0; i < data.length; i++) {
          // 페이지 목록 보여주는 displayPagination() 추가
          displayPagination(pagination)
          setPlaces(data)
        }
      }
    }
  
      // 검색결과 목록 하단에 페이지 번호 표시
      function displayPagination(pagination) {
        var paginationEl = document.getElementById('pagination'),
          fragment = document.createDocumentFragment(),
          i
  
        // 기존에 추가된 페이지 번호 삭제
        while (paginationEl?.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild)
        }
  
        for (i = 1; i <= pagination.last; i++) {
          var el = document.createElement('a')
          el.href = '#'
          el.innerHTML = i
  
          if (i === pagination.current) {
            el.className = 'on'
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i)
              }
            })(i)
          }
  
          fragment.appendChild(el)
        }
        paginationEl?.appendChild(fragment)
      }

  useEffect(() => {
    window.kakao.maps.load(function(){
      const ps = new window.kakao.maps.services.Places()
      if(Place){ps.keywordSearch(Place, placesSearchCB)}
    })}, [Place])

    const ModalContent = show && (
        <>
            <ModalDiv>
            <ModalHeader>
                <HeaderTitle>장소 추가하기</HeaderTitle>
                <CloseBtn onClick={() => {closeModal()
                 setPlaces([])}}/>
            </ModalHeader>
            <ModalBody>
            <Form className="inputForm" onSubmit={handleSubmit}>
          <Input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} style={{width:'70%', marginRight:'10px'}} />
          <ButtonFull dColor="#98c064" hColor='#65ace2' type="submit">검색</ButtonFull>
        </Form>
            {showResultList ? 
            <div id="result-list">
            {Places.map((item, i) => (
              <ResultItem key={i} style={{ marginTop: '20px' }} onClick={()=>{setChociePlace(item)
              setShowResultList(false)}}>
                <ResultItemHeader>
                  <ResultItemHNum><span>{i + 1}</span></ResultItemHNum>
                    <ResultItemHTitle>{item.place_name}</ResultItemHTitle>
                </ResultItemHeader>
                <div>
                  {item.road_address_name ? (
                    <div>
                      <ResultItemContent><b>도로명 주소</b> : {item.road_address_name}</ResultItemContent>
                      <ResultItemContent><b>지번</b> : {item.address_name}</ResultItemContent>
                    </div>
                  ) : (
                    <ResultItemContent><b>지번</b> : {item.address_name}</ResultItemContent>
                  )}
                  <ResultItemContent><b>전화번호</b> : {item.phone}</ResultItemContent>
                </div>
              </ResultItem>
            ))}
            <Pagination id="pagination"></Pagination>
          </div>
            : <>
            {choicePlace ? 
            <ChoiceDiv>
            <ChoiceTitle>{choicePlace.place_name}</ChoiceTitle>
            {choicePlace.road_address_name ? <ChoiceContent>도로명 주소 : {choicePlace.road_address_name}</ChoiceContent> : <></>}
            {choicePlace.address_name ? <ChoiceContent>지번 : {choicePlace.address_name}</ChoiceContent> : <></>}
            {choicePlace.phone ? <ChoiceContent>전화번호 : {choicePlace.phone}</ChoiceContent> : <></>}
            <ChoiceContent style={{marginBottom:'0'}}>
              <a href={choicePlace.place_url} target="_blank" rel="noreferrer" style={{color:'#65ace2'}}>🔗 카카오맵 바로 가기</a>
              </ChoiceContent>
              <ButtonDiv>
                <ButtonFull dColor='#98c064' hColor='#98c064' style={{marginRight:'10px'}} onClick={()=>{setShowResultList(true)}}>취소</ButtonFull>
                <ButtonFull dColor='#65ACE2' hColor='#65ACE2' 
                onClick={()=>{
                  if(userId){
                    postPlace(choicePlace).then( (res) => {postGroundPlace(choicePlace['id'], groundId, userId).then((res)=>{
                      setShowResultList(true)
                    })}
                    )
                  }
                }}
                >등록</ButtonFull>
              </ButtonDiv>
            </ChoiceDiv>
            : <></>}
            </>}
            
            </ModalBody>
            </ModalDiv>
        <PModalBack onClick={()=>{closeModal()
        setPlaces([])
        }} />
        </>
    )
    return ModalContent
}