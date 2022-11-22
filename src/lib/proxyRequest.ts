import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export const proxyRequest = async (
  url: string, 
  req: NextApiRequest,
  res: NextApiResponse
) => {
  //? Подставляю оригинальные хэдеры с куками в прокси запрос
  const { body, headers } = req;
  console.log(process.env.HOST)
  const { data, headers: returnedHeaders } = await axios.post(
    `${process.env.API}${url}`,
    body,
    { 
      headers: {
        ...headers,
        HOST: 'https://2a44-188-187-158-177.eu.ngrok.io'
      }
    }
  );

  //? Подставляю оригинальные хэдеры с куками в прокси ответ
  Object.entries(returnedHeaders).forEach(([headerKey, value]) => {
    res.setHeader(headerKey, value as string)
  })

  res.send(data)
}