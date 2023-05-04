import redis from "@/redis";
import { Message } from "@/typings";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  messages: Message[];
}

type ErrorData = {
  body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  const page = parseInt(req.query.page as string) || 1;
  const messageRes = await redis!.hgetall('messages');
  const messages: Message[] = messageRes 
    ? Object.values(messageRes)
      .map((message) => message as Message)
      .sort((a, b) => a.created_at - b.created_at)
    : [];
  return res.json({ messages });
}








// import { Message } from "@/typings";
// import { NextApiRequest,NextApiResponse } from "next";
// import redis from '../../redis'
// type Data = {
//   messages: Message[];
// }
// type ErrorData ={
//   body:String;
// }
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data | ErrorData>
// ) {
//   if(req.method !== 'GET') {
//     res.status(405).json({ body: 'Method Not Allowed' })
//     return
//   }

// const messageRes= await redis.hgetall('messages');
// const messages:Message[] = Object.values(messageRes)
//   .map((message)=>JSON.parse(message))
//   .sort((a,b)=>a.created_at-b.created_at)
//   ;

//   res.status(200).json({ messages })
// }