import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';


const List = styled('div')`
  border: 1px solid #98C064;
  border-radius: 15px;
  height: 150px;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 5px;
  :hover{
    cursor: pointer;
  }

  @media screen and (min-width: 360px){
      width:350px;
  }
  @media screen and (min-width:450px){
      width: 400px;
  }
  @media screen and (min-width: 700px){
      width:500px;
  }
`

const ListImg = styled('div') <{ image: string }>`
  background-image: url('${(props) => props.image}');
  background-size: cover;
  background-position: center;
  width: 150px;
  height: 150px;
  border: 1px solid none;
  float: left;
`
const ListContent = styled('div')`
  width: 250px;
  height: 150px;
  border: 1px solid none;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`

const TextWrapper = styled('div')`
  margin: 4px;
`


const TitleName = styled('a')`
  font-size: 1rem;
  font-weight: bolder;
`
const Name = styled('a')`
font-size: 0.75rem;
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


export default function MissionList({ missionId, entryPoint, title, startDate, endDate, sidoCode, nowPerson, maxPerson, repImageURL }: MissionProps) {
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
          <div>
            <TextWrapper>
              <TitleName>{title}</TitleName>
            </TextWrapper>
            <TextWrapper>
              <Name>{sidoCode}</Name>
            </TextWrapper>
            <TextWrapper>
              <Date>{startDate[0]}.{startDate[1]}.{startDate[2]}~{endDate[0]}.{endDate[1]}.{endDate[2]}</Date>
            </TextWrapper>
            <TextWrapper>
              <JoinPeople>{nowPerson} / {maxPerson}명</JoinPeople>
            </TextWrapper>
          </div>
          <PointBtn>+{entryPoint}</PointBtn>
        </ListContent>
      </List>
    </>
  )
}
