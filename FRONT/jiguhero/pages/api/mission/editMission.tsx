import { BASE_URL} from "pages/api/fetch";


const PutMission = async (postdata) => {
  const t =localStorage.getItem('access-token')
  const token = t.substring(1,t.length-1)
  const Token = `Bearer ${localStorage.getItem('access-token')}`
  
  
  let Form = new FormData();

  Form["title"]= postdata.title
  Form["startDate"] =postdata.startDate
  Form["endDate"]= postdata.endDate 
  Form["sidoCode"]= postdata.sido
  Form["gugunCode"]= postdata.gugun
  Form["dongCode"]= postdata.dong
  Form["entryPoint"]= postdata.point
  Form["maxPerson"]= postdata.people
  Form["content"]= postdata.text
  
  const response = await fetch(`${BASE_URL}mission/${Number(postdata.missionId)}/details?userId=${Number(4)}`, {
    method: "PUT",
    headers: {
      Authorization: Token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "content": postdata.text,
  "dongCode": postdata.dong,
  "endDate": postdata.endDate,
  "entryPoint": postdata.point,
  "gugunCode": postdata.gugun,
  "maxPerson": postdata.people,
  "sidoCode": postdata.sido,
  "startDate": postdata.startDate,
  "title": postdata.title,
    }),
  }) 
  
  const data = await response.json().catch((error) => {
      console.error("Error:", error);
    });
  return data
};

export default PutMission;