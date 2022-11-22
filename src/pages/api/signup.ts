import type { NextApiRequest, NextApiResponse } from 'next'
import { apiErrorHandle } from '@/lib/apiError';
import { proxyRequest } from '@/lib/proxyRequest';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    proxyRequest('/v1/auth/signup', req, res)
  } catch (error: any) {
    apiErrorHandle(error, res)
  }
}
