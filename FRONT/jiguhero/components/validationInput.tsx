import React, { useState } from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
// import { TextField } from "@mui/material";
import { ButtonBorder, ButtonFull } from 'styles/styled';


//handleValueCheck는 중복확인을 할 수 있는 api함수를 담아주면 됩니다.
//isCheck는 부모로부터 중복확인 여부 state 값을 받아온다.
//setIsCheck는 부모로부터 중복확인 여부 state를 변경시킬 수 있는 함수를 받아온다.
export default function ConfirmValidationInput({
  type,
  value,
  maxValue,
  setValue,
  regexCheck,
  successText,
  errorText,
  defaultText,
  handleValueCheck,
  isCheck,
  setIsCheck,
}) {
  //닉네임 유효성 검사
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState(defaultText);

  //중복체크를 on 할 것인지 안할것인지 판별 여부
  const [isOnCheck, setOnCheck] = useState(false);

  const HandleOnChange = (e) => {
    //한번이라도 수정한 적이 있으면 
    //isCheck를 false 변경시킨다.
    if (isCheck) setIsCheck(false);


    //최대값이 지정되어있으면 value를 저장하지 않는다.
    if (maxValue && maxValue < e.target.value.length) return;
    setValue(e.target.value);


    //공백인 경우 defaultText로 바꾼다.
    if (e.target.value === "") {
      setIsError(true);
      return setHelperText(defaultText);
    }

    if (regexCheck) {
      // 정규표현식체크가 통과되면 successText를 송출하고 
      //아니면 errorText를 송출한다
      if (regexCheck.test(e.target.value)) {
        setIsError(false);
        setOnCheck(true);
        return setHelperText(successText);
      }
      if (!regexCheck.test(e.target.value)) {
        setIsError(true);
        setHelperText(errorText);
        setOnCheck(false);
      }
    }
  };

  const handleCheck = () => {
    //handleValueCheck는 중복확인을 할 수 있는 api함수를 담기
    handleValueCheck();
  };

  return (
    <Container>

      <HeroTextField
        label="대원명을 입력해주세요"
        error={isError}
        id="nicknameInput"
        helperText={helperText}
        variant="standard"
        type={type}
        onChange={HandleOnChange}
        value={value}
      />
      {isCheck ? (
        <ButtonFull
          hColor={'#65ACE2'}
          dColor={'#98C064'}>확인</ButtonFull>
      ) : (
        <ButtonBorder
          hColor={'#65ACE2'}
          dColor={'#98C064'}
          isOnCheck={isOnCheck}
          disabled={!isOnCheck ? true : false}
          onClick={handleCheck}
        >
          중복확인
        </ButtonBorder>
      )}
    </Container>
  );
}


// ConfirmValidationInput.defaultProps = {
//   type: "text",
//   label: "",
//   value: "",
//   setValue: () => { },
//   isCheck: false,
//   setIsCheck: () => { },
//   handleValueCheck: () => { }
// };


//////styled-components
const Container = styled('div')`
  position: relative;
`;


const HeroTextField = styled(TextField)`
  width: 13.5rem;
  height: 7vw;
  :hover{
    color: #65ACE2;
  }

`

