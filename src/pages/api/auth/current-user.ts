import { redirectHandler } from "@/lib/redirectHandler";
import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";


export default redirectHandler('/v1/auth/current-user')
// export default async function(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const { body, headers, method } = req;
    
//     const { data, headers: returnedHeaders, status } = await axios.get(
//       `${process.env.API}/v1/auth/current-user`,
//       // body,
//       { headers }
//     );

//     //? Подставляю оригинальные хэдеры с куками в прокси ответ
//     Object.entries(returnedHeaders).forEach(([headerKey, value]) => {
//       res.setHeader(headerKey, value as string)
//     })

//     res.status(status).json(data)
//   } catch (error: any) {
//     const axiosError = error as AxiosError

//     res
//       .status(axiosError.response?.status || 500)
//       .json(axiosError.response?.data || axiosError.message)
//   }
// }