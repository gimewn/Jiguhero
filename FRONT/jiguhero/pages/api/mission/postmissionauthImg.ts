import { BASE_URL } from "pages/api/fetch";


const PostMissionauthImg = async (createImg, missionId, userId) => {
  const t =localStorage.getItem('access-token')
  const token = t.substring(1,t.length-1)
  const Token = `Bearer ${localStorage.getItem('access-token')}`
  const ImgForm = new FormData();
  ImgForm.append("file", createImg);
  
  // console.log(ImgForm)

  const response = await fetch(`${BASE_URL}image/mission?userId=${userId}&missionId=${missionId}&rep=0`, {
    method: "POST",
    headers: {
      Authorization: Token,
    
    },
    body: ImgForm,
  })

  const data = await response.json().catch((error)=>{
    console.error("Error:", error)
  })
  console.log(data)
  return data
};

export default PostMissionauthImg;
