import { BASE_URL, Token } from "pages/api/fetch";


const PostNewMission = async (postdata) => {

  const ImgForm = new FormData();
  
  ImgForm.append("title", postdata.title);
  ImgForm.append("startDate", postdata.astartDate);
  ImgForm.append("endDate", postdata.aendDate );
  ImgForm.append("sidoCode", postdata.sido);
  ImgForm.append("gugunCode", postdata.gugun);
  ImgForm.append("dongCode", postdata.dong);
  ImgForm.append("entryPoint", postdata.point);


  await fetch(`${BASE_URL}mission?userId=${postdata.userId}`, {
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

export default PostNewMission;