import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../fetch";

export default async function userGround(userId) {
  const t = localStorage.getItem("access-token");
  const token = t.substring(1, t.length - 1);
  const Token = `Bearer ${localStorage.getItem('access-token')}`

  const response = await fetch(`${BASE_URL}ground/like/${userId}`, {
    method: "GET",
    headers: new Headers({
      Authorization: Token,
    }),
  });
  const data = await response.json().catch(() => {});
  console.log(data)
  return data;
}
