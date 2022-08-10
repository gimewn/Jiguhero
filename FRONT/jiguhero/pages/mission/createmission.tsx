import styled from "styled-components";
import { ButtonFull, ButtonBorder } from "styles/styled";
import Backcomponents from "components/back";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { ko } from 'date-fns/esm/locale';
import locale from "date-fns/locale/ko";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  dehydrate,
  Query,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import PostMission from "pages/api/mission/index";

import getImgUrl from "pages/api/getImgUrl";
import Image from "next/image";
import moment from "moment";
import PostMissionImg from "pages/api/postMissionImg";

const MissioWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

const Block = styled("div")`
  margin: 0.5rem;
`;

const Content = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 360px) {
    width: 400px;
  }
  @media screen and (min-width: 550px) {
    width: 500px;
  }
  @media screen and (min-width: 700px) {
    width: 620px;
  }
`;

const BtnContent = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: right;
  justify-content: right;
  @media screen and (min-width: 360px) {
    width: 400px;
  }
  @media screen and (min-width: 550px) {
    width: 500px;
  }
  @media screen and (min-width: 700px) {
    width: 620px;
  }
`;

const Text = styled("a")`
  font-weight: bold;
`;

const BoxInput = styled("input")`
  border: #65ace2 solid 1px;
  background-color: white;
  border-radius: 15px;
  padding: 3px;
  width: 13rem;
  margin-left: 10px;
`;
const DateInput = styled(DatePicker)`
  border: #65ace2 solid 1px;
  background-color: white;
  border-radius: 15px;
  width: 100px;
  box-sizing: border-box;
`;
const DateWrapper = styled("div")`
  display: inline-flex;
`;

const SelectSido = styled("select")`
  border: #65ace2 solid 1px;
  background-color: white;
  border-radius: 15px;
  padding: 3px;
  margin: 0.5rem;
`;

const SelectGugun = styled(SelectSido)``;

const SelectDong = styled(SelectSido)``;
const CameraBox = styled("div")`
  width: 150px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 100px;
  box-shadow: 0px 0px 5px 0px #dadce0 inset;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
  }
`;
const CameraBtn = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PointInput = styled("input")`
  border: #65ace2 solid 1px;
  background-color: white;
  border-radius: 15px;
  padding: 3px;
  width: 13rem;
  margin-left: 10px;
`;
const PeopleInput = styled(PointInput)``;

const SubmitBtn = styled(ButtonFull)`
  width: 3rem;
  margin-right: 3rem;
`;

const SUploadImage = styled(IconButton).attrs({ type: "button" })``;

//임무명
function MissionName() {
  const [text, setText] = useState("");
  const onChange = (event) => {
    setText(event.target.value);
    // console.log(event.target.value);
  };
  return (
    <div>
      <Text>임무명</Text>
      <BoxInput type="text" onChange={onChange} value={text} />
    </div>
  );
}

//활동기간
function DatePick() {
  const nowTime = moment().format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // console.log(nowTime);
  // console.log(startDate, endDate);
  return (
    <>
      <Text>활동기간</Text>
      <DateWrapper>
        <DateInput
          selected={startDate}
          onChange={(date) => setStartDate(date)}
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
          onChange={(date) => setEndDate(date)}
          selectsEnd
          locale={locale}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
        />
      </DateWrapper>
    </>
  );
}
//포인트
function Point() {
  return (
    <>
      <Text>포인트</Text>
      <PointInput type="number" min="1" max="2000" />
    </>
  );
}
//정원
function JoinPeople() {
  return (
    <>
      <Text>정원</Text>
      <PeopleInput type="number" min="1" />
    </>
  );
}

//미션사진

//지역 설정 ---
function MissionLocation() {
  // const [data, setData] = useState([]);
  // const { data: sido } = useQuery(['sido'], getSido);
  // const [ChoiceSido, setChoiceSido] = useState('11');
  // const { data: gugun } = useQuery(['gugun', ChoiceSido], () => getGugun(ChoiceSido), {
  //   enabled: !!ChoiceSido,
  // });
  // const [ChoiceGugun, setChoiceGugun] = useState('11110');
  // const { data: dong } = useQuery(['dong', ChoiceGugun], () => getDong(ChoiceGugun), {
  //   enabled: !!ChoiceGugun
  // })
  // const [ChoiceDong, setChoiceDong] = useState('');
  // let search = false;

  return (
    <>
      <Text>지역</Text>
      {/* 시도 선택 */}
      <SelectSido></SelectSido>

      {/* 구군 선택 */}
      <SelectGugun></SelectGugun>

      {/* 동 선택 */}
      <SelectDong></SelectDong>

      {/* 윤주님 코드 */}
      {/* <PlaceGroup>
        {data?.map((item) => (
          <Place
            key={item.placeId}
            onClick={() => {
              setShow(true);
              setChoiceP(item);
            }}
          >
            <PlaceTitle className="placeTitle">{item.name}</PlaceTitle>
            <WithIcon>
              <LocIcon className="icon" /><PlaceAddress>{item.roadAddress}</PlaceAddress>
            </WithIcon>
            {item.content ? <WithIcon>
              <ConIcon className="icon" /><PlaceContent>{item.content}</PlaceContent>
            </WithIcon> : <></>}
          </Place>
        ))}
      </PlaceGroup> */}
    </>
  );
}

interface IForm {
  img: File;
}

export default function Createmission() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  function MissionPicture({ image }) {
    const [createImg, setCreateimg] = useState(null);
    const changeHandler = (e) => {
      // console.log(e.target.files[0])
      setCreateimg(e.target.files[0]);
    };
    
    return (
      <CameraBtn>
        <SUploadImage aria-label="upload picture" component="label">
          <input
            {...register("Img", {
              required: "사진을 등록해주세요",
            })}
            accept="image/*"
            type="file"
            name="file"
            onChange={changeHandler}
          />
          <button onClick={()=>{
           PostMissionImg(createImg)
          }} >제출</button>

          <CameraBox>
            <PhotoCamera fontSize="large" />
          </CameraBox>
        </SUploadImage>
      </CameraBtn>
    );
  }
  return (
    <>
      {/* 헤더 */}
      <Head>
        <title>임무 생성하기 | 지구-방위대</title>
      </Head>

      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <Backcomponents name="임무 생성하기"></Backcomponents>

      <MissioWrapper>
        {/* 미션사진추가 */}
        <Block>
          <Content>
            <MissionPicture  />
          </Content>
        </Block>

        {/* 임무명 */}
        <Block>
          <Content>
            <MissionName />
          </Content>
        </Block>

        {/* 활동기간 */}
        <Block>
          <Content>
            <DatePick />
          </Content>
        </Block>

        {/* 포인트 */}
        <Block>
          <Content>
            <Point />
          </Content>
        </Block>

        {/* 정원 */}
        <Block>
          <Content>
            <JoinPeople />
          </Content>
        </Block>

        {/* 지역 */}
        <Block>
          <Content>
            <MissionLocation />
          </Content>
        </Block>

        {/* 등록버튼 */}
        <Block>
          <BtnContent>
            <SubmitBtn
              hColor={"#98C064"}
              dColor={"#65ACE2"}
              variant="contained"
              type="submit"
              // onClick={() => router.push("/")}
            >
              등록
            </SubmitBtn>
          </BtnContent>
        </Block>
      </MissioWrapper>
    </>
  );
}

export async function getServerSideProps(context) {
  const createmission = new QueryClient();
  const session = await getSession(context);
  await createmission.prefetchQuery(["mission"], () => {
    PostMission();
  });

  return {
    props: {
      data: {
        session,
        dehydratedState: dehydrate(createmission),
      },
    },
  };
}
