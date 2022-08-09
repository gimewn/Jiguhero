import { Token, BASE_URL } from "pages/api/fetch";



export default async function deleteNickname(userId) {
	const response = await fetch(`${BASE_URL}user/${userId}`,
	{
		method: "DELETE",
		headers: new Headers({
			Authorization: Token,
		}),

	})

	const data = await response.json()


	return data
}



