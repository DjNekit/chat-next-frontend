import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { setHeaders } from '../../helpers/setHeaders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  try {
    const { headers } = req
    console.log(headers)
    
    const { data, headers: returnedHeaders } = await axios.post(
      `${process.env.API}/v1/auth/refresh-tokens`,
      undefined, 
      { 
        headers: {
          ...headers,
          host: 'https://16a4-79-132-138-72.eu.ngrok.io'
        }
      }
    )

    setHeaders(res, returnedHeaders)

    res.send(data)

  } catch (e: any) {
    const { data } = e.response
    res.status(data.statusCode).send(data)
    // res.send(e)
  }
}
