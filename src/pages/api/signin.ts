import type { NextApiRequest, NextApiResponse } from 'next'
import { proxyRequest } from '@/lib/proxyRequest';
import { apiErrorHandle } from '@/lib/apiError';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    proxyRequest('/v1/auth/signin', req, res)
  } catch (error: any) {
    throw new Error(error) 
    apiErrorHandle(error, res)
  }
}
