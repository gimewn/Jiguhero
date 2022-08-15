import { BASE_URL, Token } from "pages/api/fetch";


const PostMissionauthtext = async (content,missionId,userId,imageId) => {
  console.log(imageId)
  let Form = new FormData();

  Form["content"]= content
  Form["missionId"] = missionId
  Form["userId"]= userId 
  Form["imageId"]= imageId

  
  const response = await fetch(`${BASE_URL}feed`, {
    method: "POST",
    headers: {
      Authorization: Token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Form),
  }) 
  
  const data = await response.json().catch((error) => {
      console.error("Error:", error);
    });
  return data
};

export default PostMissionauthtext;