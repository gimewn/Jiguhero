import { BASE_URL, Token } from "../fetch";




const PostNewMission = async (postdata) => {
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
      Authorization: Token,
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