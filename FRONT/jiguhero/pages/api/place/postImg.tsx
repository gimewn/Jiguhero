import { BASE_URL, Token } from "pages/api/fetch";


const PostPlaceImg = async (createImg, placeId, userId) => {
  const ImgForm = new FormData();
  ImgForm.append("file", createImg);

  await fetch(`${BASE_URL}image/place?userId=${userId}&placeId=${placeId}`, {
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

export default PostPlaceImg;
