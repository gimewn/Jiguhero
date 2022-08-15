import { Token, BASE_URL } from "pages/api/fetch";



export default async function updateNickname(nickname, userId) {
	console.log(nickname)
	const response = await fetch(`${BASE_URL}user/${userId}?nickname=${nickname}`,
	{
		method: "PUT",
		headers: new Headers({
			Authorization: Token,
		}),
		// body: JSON.stringify({
		// 	nickname: nickname
		// })
	})

	const data = await response.json()


	return data
}