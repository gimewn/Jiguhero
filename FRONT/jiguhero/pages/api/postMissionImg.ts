import { BASE_URL, Token } from "pages/api/fetch";

// export default async function PostMissionImg(){

// const response = await fetch(`${BASE_URL}image/mission?userId=1&missionId=1&rep=0`, {
//         method:'POST',
//         headers:{
//             Authorization : Token,
//             'Content-Type': 'application/json',

//         },

//     });
//     console.log(response)
//     const data = await response.json()
//     .then((res)=>{
//         console.log(res)
//         console.log("success")
//     })
//     .catch((error)=>{
//         console.error(error)
//     })
//     return data
// }

const PostMissionImg = async (createImg) => {
  const ImgForm = new FormData();
  ImgForm.append("file", createImg);
  // console.log(ImgForm)

  await fetch(`${BASE_URL}image/mission?userId=1&missionId=1&rep=0`, {
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
