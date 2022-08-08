import styled from 'styled-components';

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

  @media screen and (min-width: 360px){
      width:350px;
  }
  @media screen and (min-width:450px){
      width: 400px;
  }
  @media screen and (min-width: 700px max-width: 1400;){
      width:500px;
  }
`
const ListImg = styled('div')`
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
`

const TextWrapper = styled('div')`
  margin: 4px;
`
const Nick = styled('a')`
  font-size: 0.75rem;
  font-weight: bold;
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

interface MissionProps {
  nickname: string,
  title: string,
  start_date: number,
  end_date: number,
  sido: string,
  now_person: number,
  max_person: number,
  image: string,
}


export default function MissionList({ nickname, title, start_date, end_date, sido, now_person, max_person, image }: MissionProps) {
  return (
    <>
      <List>
        <ListImg image={image} />
        <ListContent>

          <TextWrapper>
            <Nick>{nickname}</Nick>
            <Name>의 임무</Name>
          </TextWrapper>
          <TextWrapper>
            <TitleName>{title}</TitleName>
          </TextWrapper>
          <TextWrapper>
            <Name>{sido}</Name>
          </TextWrapper>
          <TextWrapper>
            <Date>{start_date}~{end_date}</Date>
          </TextWrapper>
          <TextWrapper>
            <JoinPeople>{now_person} / {max_person}명</JoinPeople>
          </TextWrapper>
        </ListContent>

      </List>
    </>
  )
}
