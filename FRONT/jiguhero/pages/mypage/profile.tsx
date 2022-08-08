import styled from "styled-components";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import groundUserData from "pages/api/ground/[id]";
import missionUserData from "pages/api/mission/[id]";
import userData from "pages/api/user/[id]";
import { FieldErrors, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ButtonFull } from "styles/styled";
import { Button } from "@mui/material";
import { display } from "@mui/system";

const BgImg = styled("div")`
  img {
    display: flex;
    align-items: center;
    left: 3.5px;
    top: 3.5px;
    justify-content: center;
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
`;

const UploadButton = styled("div")`
      background-color: ${(props) => props.dColor};
    border-radius: 15px;
    border: ${(props) => props.dColor} 1px solid;
    padding:10px;
    color:white;
    :hover, .active{
        background-color: ${(props) => props.hColor};
        border:${(props) => props.hColor} 1px solid
    }
`

const Filename = styled("input")`
  display: none;
`;

const PfForm = styled("form")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Update {
  username: string;
  email: string;
  password: string;
  image: FileList;
}

export default function Profile({ data }) {
  const [pfimg, setPfimg] = useState();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Update>({
    mode: "onBlur",
  });
  const onValid = (data: Update) => {};
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  useEffect(() => {
    setPfimg(data.session.user.image);
  }, []);

  return (
    <>
      <PfForm onSubmit={handleSubmit(onValid, onInvalid)}>
        <BgImg>
          <img alt="nitz" src={`${pfimg}`} />
        </BgImg>
        <label for="image">
          <UploadButton  dColor={"#98C064"} hColor={"#65ACE2"}>
            프로필사진변경
          </UploadButton>
        </label>
        <Filename
          type="file"
          accept=".img, .png, .ipeg"
          name="image"
          id="image"
        />
        <input
          {...register("username", {
            required: "Username is required",
            minLength: {
              message: "The username should be longer than 5 chars.",
              value: 5,
            },
          })}
          type="text"
          placeholder="Username"
        />

        

        <input
          {...register("email", {
            required: "Email is required",
            validate: {
              notGmail: (value) =>
                !value.includes("gmail.com") || "Gmail is not",
            },
          })}
          type="email"
          placeholder="Username"
        />
        {errors.email?.message}

        <input type="submit" value="submit" />
      </PfForm>
    </>
  );
}

export async function getServerSideProps(context) {
  const session2 = new QueryClient();
  const userInfo2 = new QueryClient();
  const missionInfo2 = new QueryClient();
  const groundInfo2 = new QueryClient();
  const session = await getSession(context);
  await session2.prefetchQuery(["session"], () => {
    return getSession(context);
  });
  await userInfo2.prefetchQuery(["userInfo"], () => {
    userData();
  });
  await missionInfo2.prefetchQuery(["missionUserInfo"], () => {
    missionUserData(context);
  });
  await groundInfo2.prefetchQuery(["groundUserInfo"], () => {
    groundUserData(context);
  });
  console.log(dehydrate(groundInfo2));

  return {
    props: {
      data: {
        session,
        dehydratedState: dehydrate(userInfo2),
      },
    },
  };
}
