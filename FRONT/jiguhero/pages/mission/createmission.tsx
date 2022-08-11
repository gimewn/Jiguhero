import styled from "styled-components";
import { ButtonFull, ButtonBorder } from "styles/styled";
import Backcomponents from "components/back";
import Head from "next/head";
import React, { useEffect, useState, FocusEvent } from "react";
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

import PostMission from "pages/api/mission/index";

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
  img {
    object-fit: cover;
    width: 150px;
    height: 150px;
    border-radius: 100px;
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

//지역 설정 ---
function MissionLocation() {
  const [data, setData] = useState([]);
  const [sido, setSido] = useState()
  const [gugun, setGugun] = useState()
  const [dong, setDong] = useState()

  const [ChoiceSido, setChoiceSido] = useState('11');
  
  const [ChoiceGugun, setChoiceGugun] = useState('11110');
  
  const [ChoiceDong, setChoiceDong] = useState('');
  let search = false;

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
      <PlaceGroup>
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
      </PlaceGroup>
    </>
  );
}

export default function Createmission() {
  const [createImg, setCreateimg] = useState<File>(null); // 이미지 파일
  const [preview, setPreview] = useState<string>(); // 이미지 미리보기 사진
  const [title, setTitle] = useState(""); // 임무명
  const [startDate, setStartDate] = useState(new Date()); // 시작일
  const [endDate, setEndDate] = useState(new Date()); // 종료일
  const [astartDate, setAstartDate] = useState<Array<string>>(); // 시작일 배열 [요일, 월, 일, 년]
  const [aendDate, setAendDate] = useState<Array<string>>(); // 종료일 배열 [요일, 월, 일, 년]
  const [point, setPoint] = useState<Number>();
  const [people, setPeople] = useState<Number>()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // 미션 사진 등록
  function MissionPicture() {
    const changeHandler = (e) => {
      const file = e.target.files[0];
      if (file && file.type.substr(0, 5) === "image") {
        setCreateimg(e.target.files[0]);
      } else {
        setCreateimg(null);
      }
    };

    return (
      <CameraBtn>
        <SUploadImage aria-label="upload picture" component="label">
          <input
            {...register("Img", {
              required: "사진을 등록해주세요",
            })}
            hidden
            accept="image/*"
            type="file"
            name="file"
            onChange={changeHandler}
          />

          {createImg ? (
            <CameraBox>
              <img src={preview} />
            </CameraBox>
          ) : (
            <CameraBox>
              <PhotoCamera fontSize="large" />
            </CameraBox>
          )}
        </SUploadImage>
      </CameraBtn>
    );
  }

  // 임무명
  function MissionName() {
    const onChange = (event) => {
      setTitle(event.target.value);
    };
    return (
      <div>
        <Text>임무명</Text>
        <BoxInput type="text" onChange={onChange} value={title} />
      </div>
    );
  }

  //활동기간
  function DatePick() {
    return (
      <>
        <Text>활동기간</Text>
        <DateWrapper>
          <DateInput
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setAstartDate(startDate.toDateString().split(" "));
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
              setEndDate(date);
              setAendDate(endDate.toDateString().split(" "));
            }}
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
        <PointInput
          type="number"
          min={500}
          max="5000"
          step={500}
          defaultValue={500}
          onBlur={(e) => {
            const tmp = Number(e.target.value);
            if (tmp < 500) {
              e.target.value = 500;
              
            } else if (tmp > 5000) {
              e.target.value = 5000;
            } else if (Number(e.target.value) % 10) {
              e.target.value = tmp - (tmp % 10);
            }
            setPoint(Number(e.target.value));
            return

          }}
        />
      </>
    );
  }

  //정원
  function JoinPeople() {
    return (
      <>
        <Text>정원</Text>
        <PeopleInput defaultValue={10} onBlur={(e:FocusEvent<HTMLInputElement>)=>{
          const num = Number(e.target.value)
          if (num<10){
            e.target.value=10
            
          }else if(num>500){
            e.target.value=500
            
          }else if (num%10){
            e.target.value=num-(num%10)
          }
          setPeople(Number(e.target.value))
  
        }} />
      </>
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
            <MissionPicture />
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

  await createmission.prefetchQuery(["mission"], () => {
    PostMission();
  });

  return {
    props: {
      data: {
        dehydratedState: dehydrate(createmission),
      },
    },
  };
}
