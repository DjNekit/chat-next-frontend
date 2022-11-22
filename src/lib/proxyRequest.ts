import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { axiosClient } from "./axios";

export const proxyRequest = async (
  url: string, 
  req: NextApiRequest,
  res: NextApiResponse
) => {
  //? Подставляю оригинальные хэдеры с куками в прокси запрос
  const { body, headers } = req;
  const { data, headers: returnedHeaders } = await axiosClient.post(
    `${process.env.API}${url}`,
    body,
    { 
      baseURL: '/',
      headers: {
        ...headers,
        host: process.env.API
      }
    }
  );

  //? Подставляю оригинальные хэдеры с куками в прокси ответ
  Object.entries(returnedHeaders).forEach(([headerKey, value]) => {
    res.setHeader(headerKey, value as string)
  })

  res.send(data)
}