import { NextApiRequest, NextApiResponse } from 'next';

export default function authScoope(req: NextApiRequest, res: NextApiResponse): boolean {
  if (req.body.userType !== undefined) {
    return req.body.userType;
  }

  return false;
}
