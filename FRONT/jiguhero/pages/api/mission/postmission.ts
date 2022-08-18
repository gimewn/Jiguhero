import { BASE_URL} from "../fetch";




const PostNewMission = async (postdata) => {
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
  console.log(postdata)

  const Form = new FormData();
  
  Form.append("title", postdata.title);
  Form.append("startDate", postdata.startDate);
  Form.append("endDate", postdata.ednDate );
  Form.append("sidoCode", postdata.sido);
  Form.append("gugunCode", postdata.gugun);
  Form.append("dongCode", postdata.dong);
  Form.append("entryPoint", postdata.point);
  Form.append("maxPerson", postdata.people);
  Form.append("content", postdata.text);



  await fetch(`${BASE_URL}mission/?userId=${postdata.userId}`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(Form),
  })
    .then((response) => {
        console.log("Success:", response);
    })

    .catch((error) => {
      console.error("Error:", error);
    });
};

export default PostNewMission;