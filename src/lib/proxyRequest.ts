import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiErrorHandle } from "./apiError";
import { axiosClient } from "./axios";

export const proxyRequest = async (
  url: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    //? Подставляю оригинальные хэдеры с куками в прокси запрос
    const { body, headers } = req;
    const { data, headers: returnedHeaders } = await axios.post(
      `${process.env.API}${url}`,
      body,
      {
        // baseURL: '/',
        headers: {
          ...headers,
          // host: process.env.API
        }
      }
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