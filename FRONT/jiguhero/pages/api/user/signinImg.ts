import { BASE_URL, Token } from "pages/api/fetch";


const signinUserImg = async (userImg, userId) => {
  const ImgForm = new FormData();
  ImgForm.append("file", userImg);
  // console.log(ImgForm)

  await fetch(`${BASE_URL}image/user?userId=${userId}`, {
    method: "POST",
    headers: {
      Authorization: Token,
    
    },
    body: ImgForm,
  })
    .then((response) => {
        console.log("Success:", response);
    })

    .catch((error) => {
      console.error("Error:", error);
    });
};

export default signinUserImg;
