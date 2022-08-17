import styled from 'styled-components';
import { useRouter } from 'next/router';
import getSido from 'pages/api/ecomarket/getSido';
import { useState, useEffect } from 'react';

const List = styled('div')`
  border: 1px solid #98C064;
  border-radius: 15px;
  height: 180px;
  display:flex;
  /* flex-direction: row;
  align-items: center;
  justify-content: center; */
  overflow: hidden;
  margin: 5px;
  :hover{
    cursor: pointer;
  }

  /* @media screen and (min-width: 360px){
      width:320px;
  }
  @media screen and (min-width:450px){
      width: 350px;
  }
  @media screen and (min-width: 700px) and (max-width:1400){
      width:500px;
  } */
`

const ListImg = styled('div') <{ image: string }>`
  background-image: url('${(props) => props.image}');
  background-size: cover;
  background-position: center;
  width: 200px;
  @media only screen and (max-width: 650px) {
      width:150px;
  }
  @media only screen and (max-width: 450px) {
      width:150px;
  }
  height: 180px;
  border: 1px solid none;
  float: left;
`
const ListContent = styled('div')`
  min-width:200px;
  width:300px;
  position:relative;
  @media only screen and (max-width: 650px) {
      width:200px;
  }
  @media only screen and (max-width: 450px) {
      width:150px;
  }
  height: 180px;
  border: 1px solid none;
  /* float: left; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`

const TextWrapper = styled('div')`
  margin-left: 15px;
  margin-right: auto;
  margin-top:10px;
`

const TitleName = styled('h1')`
  font-size: 20px;
  font-weight: bolder;
  margin: 0;
`
const Name = styled('p')`
  font-size: 15px;
  margin-top: 10px;
`
const Date = styled(Name)`
`
const JoinPeople = styled(Name)`
`
const PointBtn = styled('div')`
  position: absolute;
  bottom:0;
  right:0;
  border-radius: 12.5px;
  padding:5px;
  border: 1px solid #98C064;
  background-color: #98C064;
  color: white;
  font-size: 15px;
  margin-left:auto;
  margin-right:10px;
  margin-bottom:10px;
`

interface MissionProps {

  entryPoint?: number;
  title?: string;
  startDate?: string;
  endDate?: string;
  sidoCode?: string;
  nowPerson?: number;
  maxPerson?: number;
  repImageURL?: string;
  missionId?: number;
  today?: string;
}

export default function NMissionList({ today, missionId, entryPoint, title, startDate, endDate, sidoCode, nowPerson, maxPerson, repImageURL }: MissionProps) {
  const router = useRouter();
  const [sido, setSido] = useState();
  useEffect(()=>{
    getSido().then((res) => {
      res.filter((item)=>{
      if(item.sidoCode == sidoCode){
        setSido(item.sidoName)
      }
    })})
  }, [])
 
  return (
    <>
  
    

      <List onClick={() => {
        if(endDate<today){
          alert("임무가 종료되었습니다!")
        }else if(startDate>today){
          alert("임무가 아직 시작되지 않았습니다!")
        }else{
          router.push(`/mission/${missionId}/mymission`)
        }
        }}>
      <ListImg image={repImageURL} />
      <ListContent>
        <TextWrapper>
          <TitleName>{title}</TitleName>
          <Name>{sido}</Name>
          <Date>{startDate}~{endDate}</Date>
          <JoinPeople>{nowPerson} / {maxPerson}명</JoinPeople>
        </TextWrapper>
        <PointBtn>+{entryPoint}</PointBtn>
      </ListContent>
    </List>
 
      
    </>
  )
}