import { NextApiResponse } from "next";

export const apiErrorHandle = (error: any, res: NextApiResponse) => {
  console.log(error)
  const data = error?.response?.data

  data
    ? res.status(data.statusCode).json(data)
    : res.send(error)
}  