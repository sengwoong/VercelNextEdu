import { NextApiRequest, NextApiResponse } from "next";


export default async function authUserType(req: NextApiRequest, res: NextApiResponse) {
  let userType;
  if (req.body.userType !== undefined) {
    userType = req.body.userType;
  }
  return userType;
}
