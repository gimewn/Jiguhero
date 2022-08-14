import { BASE_URL, Token } from "pages/api/fetch";


const PostNewMission = async (postdata) => {
  
  let Form = new FormData();

  Form["title"]= postdata.title
  Form["startDate"] =postdata.startDate
  Form["endDate"]= postdata.endDate 
  Form["sidoCode"]= postdata.sido
  Form["gugunCode"]= postdata.gugun
  Form["dongCode"]= postdata.dong
  Form["entryPoint"]= postdata.point
  Form["maxPerson"]= postdata.people
  Form["content"]= postdata.content

  
  const response = await fetch(`${BASE_URL}mission?userId=${postdata.userId}`, {
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

export default PostNewMission;