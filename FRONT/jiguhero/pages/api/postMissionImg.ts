import { BASE_URL, Token } from "pages/api/fetch";


const PostMissionImg = async (createImg, userId, missionId) => {
  const ImgForm = new FormData();
  ImgForm.append("file", createImg);
  // console.log(ImgForm)

  await fetch(`${BASE_URL}image/mission?userId=${userId}&missionId=${missionId}&rep=0`, {
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

export default PostMissionImg;
