import { BASE_URL } from "pages/api/fetch";


const UpdateUserImg = async (userImg, userId) => {
  const t =localStorage.getItem('access-token')
  const token = t.substring(1,t.length-1)
  const Token = `Bearer ${localStorage.getItem('access-token')}`
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

export default UpdateUserImg;