import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: number
}

export default function UserId(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(res)
	if(req.method === 'GET') {
		res.status(200).json()
    
	}
}
