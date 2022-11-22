import { NextApiResponse } from "next";

export const apiErrorHandle = (error: any, res: NextApiResponse) => {
  const data = error?.response?.data

  data
    ? res.status(data.statusCode).json(data)
    : res.send(error)
}  