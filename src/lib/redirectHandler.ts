import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get"

export function redirectHandler(url: string) {
  return async function(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const { body, query, headers: { host, ...rest }, method } = req;
      const axiosMethod = method!.toUpperCase() as Methods
      
      const queryString = Object.entries(query)
        .reduce((result, [key, value]) => {
          const divider = result === '' ? '?' : '&'
          return `${result}${divider}${key}=${value}`
        }, '')

      const { data, headers: returnedHeaders, status } = await axios({
        url: `${process.env.API}${url}${queryString}`,
        method: axiosMethod,
        headers: rest,
        data: body,
      })

      //? Подставляю оригинальные хэдеры с куками в прокси ответ
      Object.entries(returnedHeaders).forEach(([headerKey, value]) => {
        res.setHeader(headerKey, value as string)
      })
  
      res.status(status).json(data)
    } catch (error: any) {
      const axiosError = error as AxiosError
  
      res
        .status(axiosError.response?.status || 500)
        .json(axiosError.response?.data || axiosError.message)
    }
  }
}

