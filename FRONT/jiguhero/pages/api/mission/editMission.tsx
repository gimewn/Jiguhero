import { BASE_URL} from "pages/api/fetch";


export default async function PutMission(postdata){
  console.log("edit", postdata)
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
  
  const response = await fetch(`${BASE_URL}mission/${Number(postdata.missionId)}/details?userId=${Number(postdata.userId)}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Form)
  }) 
  
  const data = await response.json().catch((error) => {
      console.error("Error:", error);
    });
  return data
};