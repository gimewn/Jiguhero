import React, { useState } from "react";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export default function ValidationInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  regexCheck,
  successText,
  errorText,
  defaultText
}) {
  const [isError, setIsError] = useState(true);
  const [helperText, setHelperText] = useState(defaultText);

  const HandleOnChange = (e) => {

    //최대값이 지정되어있으면 value를 저장하지 않는다.
    if (maxValue && maxValue < e.target.value.length) return;

    setValue(e.target.value);

    //공백인 경우 defaultText로 바꾼다.
    if (e.target.value === "") {
      setIsError(true);
      return setHelperText(errorText);
    }


    if (regexCheck) {
      // 정규표현식체크가 통과되면 successText를 송출하고 아니면 errorText를 송출한다
      if (regexCheck.test(e.target.value)) {
        setIsError(false);
        return setHelperText(successText);
      }
      // if (!regexCheck.test(e.target.value)) {
      //   setIsError(true);
      //   setHelperText(errorText);
      // }
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <HeroTextField
        label="대원명을 입력하게"
        error={isError}
        required
        id="nicknameInput"
        helperText={helperText}
        variant="standard"
        type={type}
        onChange={HandleOnChange}
        value={value}
      />
    </div>
  );
}

ValidationInput.defaultProps = {
  type: "text",
  label: "",
  value: ""
};

const Label = styled.span`
  color: #878787;
  font-size: 18px;
  
`;

const HeroTextField = styled(TextField)`
  width: 15rem;
  height: 7vw;
  :hover{
    color: #4aa0e2;
  }

`