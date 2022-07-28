import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { ButtonBorder, ButtonFull } from 'styles/styled';

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
  const [isOnCheck, setIsOnCheck] = useState(false);

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
      // 정규표현식체크가 통과되면 successText를 송출하고 아니면 errorText를 송출한다
      if (regexCheck.test(e.target.value)) {
        setIsError(false);
        setIsOnCheck(true);
        return setHelperText(successText);
      }
      if (!regexCheck.test(e.target.value)) {
        setIsError(true);
        setHelperText(errorText);
        setIsOnCheck(false);
      }
    }
  };
  const handleCheck = () => {
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
        <CheckBnt
          isOnCheck={isOnCheck}
          disabled={!isOnCheck ? true : false}
          onClick={handleCheck}>
          중복확인
        </CheckBnt>
      )}
    </Container>
  );
}

ConfirmValidationInput.defaultProps = {
  type: "text",
  label: "",
  value: "",
  setValue: () => { },
  isCheck: false,
  setIsCheck: () => { },
  handleValueCheck: () => { }
};


//////styled-components
const Container = styled.div`
  position: relative;
`;


const HeroTextField = styled(TextField)`
  width: 15rem;
  height: 7vw;
  :hover{
    color: #65ACE2;
  }
  input {
    width: calc(100% - 10px);
  }

`
const CheckBnt = styled(Button)`
  position: absolute;
  right: 0rem;
  width: 5rem;
  height: 40px;
  background-color: white;
  border: ${({ isOnCheck }) => (isOnCheck ? "1px solid #98C064;" : "1px solid #d9d9d9")};
  color: ${({ isOnCheck }) => (isOnCheck ? "#98C064" : "#3C3C3C")};
  font-size: 15px;
  border-radius: 15px;
    :hover, .active{
      border-color: #65ACE2;
      color: #65ACE2;
      background-color: white;}
`;
