import styled from 'styled-components';
import { useRouter } from 'next/router';



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
`


const TitleName = styled('h1')`
  font-size: 1rem;
  font-weight: bolder;
  margin:0;
`
const Name = styled('p')`
font-size: 0.75rem;
  margin-top: 5px;
  margin-bottom: 0;
`
const Date = styled(Name)`
`
const JoinPeople = styled(Name)`
`
const PointBtn = styled('div')`
  border-radius: 12.5px;
  padding:5px;
  border: 1px solid #98C064;
  background-color: #98C064;
  color: white;
  font-size: x-small;
  margin-left:auto;
  margin-right:15px;
`

interface MissionProps {

  entryPoint: number;
  title: string;
  startDate: number;
  endDate: number;
  sidoCode: string;
  nowPerson: number;
  maxPerson: number;
  repImageURL: string;
  missionId: number;
}


export default function JoinList({ missionId, entryPoint, title, startDate, endDate, sidoCode, nowPerson, maxPerson, repImageURL }: MissionProps) {
  const router = useRouter();
  // const missionDates = ({ mission_id }: { mission_id: number }) => {
  //   router.push(`/mission/${mission_id}/details`)
  // }
  // console.log(missionId)
  // console.log(missionID)

  return (
    <>
      <List onClick={() => router.push(`/mission/${missionId}`)}>
        <ListImg image={repImageURL} />
        <ListContent>

          <TextWrapper>
            <TitleName>{title}</TitleName>
            <Name>{sidoCode}</Name>
            <Date>{startDate}~{endDate}</Date>
            <JoinPeople>{nowPerson} / {maxPerson}명</JoinPeople>
          </TextWrapper>

          <PointBtn>+{entryPoint}</PointBtn>
        </ListContent>
      </List>
    </>
  )
}
