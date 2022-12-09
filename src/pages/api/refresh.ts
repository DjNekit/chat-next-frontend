import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { body, headers } = req;
    const { data, headers: returnedHeaders } = await axios.post(
      `${process.env.API}/v1/auth/refresh-tokens`,
      body,
      { headers }
    );
    //? Подставляю оригинальные хэдеры с куками в прокси ответ
    Object.entries(returnedHeaders).forEach(([headerKey, value]) => {
      res.setHeader(headerKey, value as string)
    })

    res.send(data)
  } catch (error: any) {
    const data = error?.response?.data

    data
      ? res.status(data.statusCode).json(data)
      : res.send(error)
  }
}
