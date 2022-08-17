import { BASE_URL} from "pages/api/fetch";


const PostPlaceImg = async (createImg, placeId, userId) => {
  const t = localStorage.getItem("access-token");
  let token;
  if (t.includes('"')){
    const res = t.substring(1, t.length - 1);
    token = `Bearer ${res}`
  }else{
    token = `Bearer ${localStorage.getItem('access-token')}`
  }
  // const token = t.substring(1, t.length - 1);
  // const Token = `Bearer ${localStorage.getItem('access-token')}`

  const ImgForm = new FormData();
  ImgForm.append("file", createImg);

  await fetch(`${BASE_URL}image/place?userId=${userId}&placeId=${placeId}`, {
    method: "POST",
    headers: {
      Authorization: token,
    
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

export default PostPlaceImg;
