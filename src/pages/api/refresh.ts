import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { setHeaders } from '@/helpers/setHeaders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  try {
    const { headers } = req

    const { data, headers: returnedHeaders } = await axios.post(
      `${process.env.API}/v1/auth/refresh-tokens`,
      undefined, 
      { 
        headers: {
          ...headers,
          // host: process.env.HOST
        },
        // withCredentials: true
      }
    )

    setHeaders(res, returnedHeaders)

    res.send(data)

  } catch (e: any) {
    const data = e?.response?.data
    if (!data) {
      res.send(e)
    } else {

      res.status(data.statusCode).send(data)
    }
  }
}
