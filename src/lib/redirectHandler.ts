import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get"

export function redirectHandler(url: string) {
  return async function(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const { body, headers, method } = req;
      const axiosMethod = method!.toLowerCase() as Methods
      console.log(headers)

      const { data, headers: returnedHeaders, status } = await axios({
        url: `${process.env.API}${url}`,
        method: axiosMethod,
        headers,
        data: body
      })
        // body,
        // { headers }

      // console.log(returnedHeaders)
      
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

