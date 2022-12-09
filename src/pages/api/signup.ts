import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { body, headers } = req;
    const { data, headers: returnedHeaders } = await axios.post(
      `${process.env.API}/v1/auth/signup`,
      body,
      { headers }
    );

    //? Подставляю оригинальные хэдеры с куками в прокси ответ
    Object.entries(returnedHeaders).forEach(([headerKey, value]) => {
      res.setHeader(headerKey, value as string)
    })

    res.send(data)
  } catch (error: any) {
    res.send(error)
  }
}
