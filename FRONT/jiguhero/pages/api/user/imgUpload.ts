import { Token, BASE_URL } from "pages/api/fetch";

interface UploadImg {
  imgFile: UploadImg;
  user_id: number;
}

export default async function imgUpload({ imgFile, user_id }: UploadImg) {
  const response = await fetch(`${BASE_URL}image/user`, {
    method: "POST",
    headers: new Headers({
      Authorization: Token,
    }),
    body: JSON.stringify({
      userId: user_id,
      tagname: imgFile,
    }),
  });
  const data = await response.json().catch(() => {});

  return data;
}
