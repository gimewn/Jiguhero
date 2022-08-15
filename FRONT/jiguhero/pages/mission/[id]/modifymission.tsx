import styled from "styled-components";
import { ButtonFull, ButtonBorder } from 'styles/styled';
import Backcomponents from 'components/back';
import Head from 'next/head';
import React, { useState, useEffect  } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { ko } from 'date-fns/esm/locale';
import locale from 'date-fns/locale/ko'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import PostMission from "pages/api/mission/index";
import moment from "moment";
import missionUserData from "pages/api/mission/[id]";
import { useRouter } from "next/router";
import getDetail from "pages/api/mission/getDetail";
import getImgList from 'pages/api/place/getImgList';
import postImg from 'pages/api/mission/postImg';
import getSido from "pages/api/ecomarket/getSido";
import getGugun from "pages/api/ecomarket/getGugun";
import getDong from "pages/api/ecomarket/getDong";
import putMission from 'pages/api/mission/editMission'


const MissioWrapper = styled('div')`
  display:flex;
  flex-direction: column;
  margin-top: 30px;
`


const Block = styled('div')`
  margin: 0.4rem;
`

const Content = styled('div')`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
    @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 550px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    }
`

const BtnContent = styled('div')`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
    @media screen and (min-width: 360px){
        width:400px;
    }
    @media screen and (min-width: 550px){
        width:500px;
    }
    @media screen and (min-width:700px){
        width:620px;
    }
`

const Text = styled('a')`
  font-weight: bold;
`

const BoxInput = styled('input')`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  padding:3px;
  width: 13rem;
  margin-left: 10px;
  padding: 5px;
`
const DateInput = styled(DatePicker)`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  width: 100px;
  box-sizing: border-box;
  padding: 5px;
  margin-right:9px;
  margin-left:9px;
`
const DateWrapper = styled('div')`
  display: inline-flex;

`

const SelectSido = styled('select')`
    border: #65ACE2 solid 1px;
    background-color: white;
    border-radius: 15px;
    padding:3px;
    margin: 0.5rem;
     
`

const SelectGugun = styled(SelectSido)`
`

const SelectDong = styled(SelectSido)`

`
const CameraBox = styled('form')`
  width: 250px;
  height: 200px;
  background-color: #FFffff;
  border-radius: 15px;
  box-shadow: 0px 0px 5px 0px #dadce0 inset;
  border: 0;
  display:flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 360px){
    width: 200px;
    height: 150px;
  }
`
const CameraBtn = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  
`

const PointInput = styled('input')`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  padding:3px;
  width: 13rem;
  margin-left: 10px;
  padding: 5px;
`
const PeopleInput = styled(PointInput)`
`

const MissionText = styled('textarea')`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  width: 300px;
  height: 100px;
  margin-top: 10px;
`

const SubmitBtn = styled(ButtonFull)`
  width: 300px;
  
`
const BottomDiv = styled('div')`
  margin-bottom: 80px;
`
const H2 = styled('h2')`
  @media only screen and (max-width: 650px) {
    display:none;
  }
`


export default function Createmission() {
  const router = useRouter();
  const [point, setPoint] = useState<Number>(); // 포인트
  const [MissionDetail, setMissionDetail] = useState({
    maxPerson:0,
    entryPoint:"",
    content:"",
    title:"",
    startDate:[],
    endDate:[]
  });
  const [userId, setUserId] = useState("");
  const [missionId, setMissionId] = useState("");
  const [region, setRegion] = useState();
  const [imgList, setImgList] = useState<Array<string>>();
  const [missionImg, setMissionImg] = useState<File>();
  const [preview, setPreview] = useState<string>(); // 이미지 미리보기 사진
  const [title, setTitle] = useState("")
  const nowTime = moment().format('YYYY-MM-DD')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pointNum, setPointNum] = useState('500')
  const [people, setPeople] = useState(0)
  const [content, setContent] = useState("");
  const [text, setText] = useState('')
  const [astartDate, setAstartDate] = useState(["", ""]); // 시작일 배열 [요일, 월, 일, 년]
  const [aendDate, setAendDate] = useState(["", ""]); // 종료일 배열 [요일, 월, 일, 년]


  const onPeopleChange = (event) => {
    setPeople(event.target.value)
  }
  const onChange = (event) => {
    setTitle(event.target.value)
  }
  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setMissionImg(file);
    } else {
        setMissionImg(null)
    }
  };
  useEffect(() => {
    if (missionImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(missionImg);
    } else {
      setPreview(null);
    }
  }, [missionImg]);
  useEffect(()=>{
    if(router.query.id){
      setMissionId(String(router.query.id));
    }
    const usersId = JSON.parse(localStorage.getItem('recoil-persist')).userId
    setUserId(usersId)
}, [])
const { data: sido } = useQuery(["sido"], getSido);
const [ChoiceSido, setChoiceSido] = useState(["00", ""]);
const { data: gugun } = useQuery(
  ["gugun", ChoiceSido],
  () => getGugun(ChoiceSido[0]),
  {
    enabled: !!ChoiceSido,
  }
);
const [ChoiceGugun, setChoiceGugun] = useState(["00", ""]);
const { data: dong } = useQuery(
  ["dong", ChoiceGugun],
  () => getDong(ChoiceGugun[0]),
  {
    enabled: !!ChoiceGugun,
  }
);
const [ChoiceDong, setChoiceDong] = useState(["00", ""]);
useEffect(()=>{
  if(router.query.id && userId){
    getDetail(router.query.id, userId).then((res)=>{setMissionDetail(res)
      setPeople(MissionDetail.maxPerson)
      setPointNum(MissionDetail.entryPoint)
      setText(MissionDetail.content)
      setTitle(MissionDetail.title)
      setAstartDate(MissionDetail.startDate)
      setAendDate(MissionDetail.endDate)
    getDong(res.gugunCode).then((item)=>{
      const result = item.filter((dong) => {
        if(dong.dongCode === res.dongCode){
          setRegion(dong.dongName)
            return dong
        }})
    })
    })
  }
})
const postdata = {
  title,
  missionId,
  startDate: astartDate[0],
  endDate: aendDate[0],
  point,
  people,
  sido: ChoiceSido[0],
  gugun: ChoiceGugun[0],
  dong: ChoiceDong[0],
  userId,
  text
};

  return (
    <>
      {/* 헤더 */}
      <Head>
        <title>임무 수정 | 지구-방위대</title>
      </Head>


      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <Backcomponents name='임무 수정'></Backcomponents>


      <MissioWrapper>
        <H2>🦸🏻 대원들의 임무 수정</H2>
        {/* 미션사진추가 */}
        <Block style={{display:'flex', flexDirection:'column',justifyContent:'center'}}>
          <Content>
          <CameraBtn>
            <IconButton aria-label="upload picture" component="label">
            <input
                          hidden
                          accept="image/*"
                          type="file"
                          name="file"
                          onChange={changeHandler}
                      />
              {missionImg ? (
                    <CameraBox>
                    <img src={preview} style={{width:'inherit', height:'inherit', objectFit:'cover'}} />
                    </CameraBox>
                ) : (
                    <CameraBox>
                    <PhotoCamera fontSize="large" style={{color:'#98c064'}}/>
                    </CameraBox>
                )}
            </IconButton>
          </CameraBtn>
          </Content>
          {userId ? 
                    <ButtonFull hColor={'#98C064'}
                    dColor={'#65ACE2'} style={{margin:'10px'}} onClick={()=>{postImg(missionImg, userId, missionId, 1)}}>OK</ButtonFull>
                : <></>}
        </Block>

        {/* 임무명 */}
        <Block>
          <Content>
          <div>
        <Text>
          임무명
        </Text>
        <BoxInput
          type="text"
          onChange={onChange}
          placeholder={title} />
      </div>
          </Content>
        </Block>

        {/* 활동기간 */}
        <Block>
          <Content>
          <Text>활동기간</Text>
      <DateWrapper>

        <DateInput
          selected={startDate}
          onChange={(date) => {
            setStartDate(date)
            setAstartDate(date.toISOString().split("T"));
          }}
          selectsStart
          locale={locale}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
        />
        <a> ~</a>
        <DateInput
          selected={endDate}
          onChange={(date) => {
            setEndDate(date)
            setAendDate(date.toISOString().split("T"));
          }}
          selectsEnd
          locale={locale}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
        />

      </DateWrapper>
          </Content>
        </Block>

        {/* 지역 */}
        <Block>
          <Content>
          <Text>지역</Text>
            {/* 시도 선택 */}
            <SelectSido
          onChange={(e) => {
            setChoiceSido(e.target.value.split(","));
          }}
        >
          <option value="">{ChoiceSido[1] ? ChoiceSido[1] : "시/도"}</option>
          {sido?.map((item) => (
            <option
              key={item["sidoCode"]}
              value={[item["sidoCode"], item["sidoName"]]}
            >
              {item["sidoName"]}
            </option>
          ))}
        </SelectSido>

        {/* 구군 선택 */}
        <SelectGugun
          onChange={(e) => {
            setChoiceGugun(e.target.value.split(","));
          }}
        >
          <option value="">
            {ChoiceGugun[1] ? ChoiceGugun[1] : "시/군/구"}
          </option>
          {gugun?.map((item) => (
            <option
              key={item["gugunCode"]}
              value={[item["gugunCode"], item["gugunName"].split(" ")[1]]}
            >
              {item["gugunName"].split(" ")[1]}
            </option>
          ))}
        </SelectGugun>

        {/* 동 선택 */}
        <SelectDong
          onChange={(e) => {
            setChoiceDong(e.target.value.split(","));
          }}
        >
          <option value="">{ChoiceDong[1] ? ChoiceDong[1] : "읍/면/동"}</option>
          {dong?.map((item) => (
            <option
              key={item["dongCode"]}
              value={[item["dongCode"], item["dongName"].split(" ")[2]]}
            >
              {item["dongName"].split(" ")[2]}
            </option>
          ))}
        </SelectDong>
          </Content>
        </Block>

        {/* 포인트 */}
        <Block>
          <Content>
          <Text>포인트</Text>
      <PointInput
        type="number"
        min={500}
        max={5000}
        step={500}
        defaultValue={Number(pointNum)}
        onChange={(e)=>{
          e.preventDefault()
          setPointNum(e.target.value)
        }}

        onBlur={(e) => {
          e.preventDefault();
          const tmp = Number(pointNum);
          if (tmp < 500) {
            setPointNum('500')
          } else if (tmp > 5000) {
            setPointNum('5000')
          } else if (tmp % 10) {
            setPointNum(`${tmp-(tmp%10)}`)
          }
          setPoint(Number(pointNum));
          
        }} />
          </Content>
        </Block>

        {/* 정원 */}
        <Block>
          <Content>
          <Text>정원</Text>
      <PeopleInput
        onChange={onPeopleChange}
        value={people}
        type='number' min="1" />
          </Content>
        </Block>


        {/* 내용쓰기 */}
        <MissionText
        placeholder={text}
        onChange={(event) => {
          setText(event.target.value)
          console.log(event.target.value)
        }}
        style={{padding:'10px'}}
      />

        {/* 등록버튼 */}
        <Block>
          <BtnContent>
            <SubmitBtn
              hColor={'#98C064'}
              dColor={'#65ACE2'}
            onClick={()=>{putMission(postdata).then((res)=>router.push(`/mission/${missionId}`))}}
            >수정</SubmitBtn>
          </BtnContent>
        </Block>
      </MissioWrapper>

      <BottomDiv></BottomDiv>

    </>
  )
}

export async function getServerSideProps(context) {
  const createmission = new QueryClient()
  await createmission.prefetchQuery(['mission'], () => { PostMission() })

  return {
    props: {
      data: {

        dehydratedState: dehydrate(createmission)
      },
    },
  };

}
