import { BASE_URL, Token } from "pages/api/fetch";


const PostMissionRepImg = async (createImg, userId, missionId, rep) => {
  const ImgForm = new FormData();
  ImgForm.append("file", createImg);

  await fetch(`${BASE_URL}image/mission?userId=${userId}&missionId=${missionId}&rep=${rep}`, {
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

export default PostMissionRepImg;
