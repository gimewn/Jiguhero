import { BASE_URL } from "pages/api/fetch";



export default async function deleteNickname(userId) {
	const t =localStorage.getItem('access-token')
	const token = t.substring(1,t.length-1)
	const Token = `Bearer ${localStorage.getItem('access-token')}`
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



