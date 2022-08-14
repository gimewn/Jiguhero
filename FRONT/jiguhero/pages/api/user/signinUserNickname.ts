import { Token, BASE_URL } from "pages/api/fetch";



export default async function signinUserNickname(nickname, userId) {
	const response = await fetch(`${BASE_URL}user/${userId}?nickname=${nickname}`,
	{
		method: "PUT",
		headers: new Headers({
			Authorization: Token,
		}),
		
	})

	const data = await response.json()


	return data
}