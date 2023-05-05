// zrange 또는 zrangebyscore  zrangebyscore는 주어진 범위 내에서 
import redis from "@/redis";
import { Message } from "@/typings";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";



type Data = {
  messages: Message[];
};

type ErrorData = {
  body: String;
};

export async function GET(
  req: Request,
  res: NextApiResponse<Data | ErrorData>
) {
  const messagesKey = "messages";

  const messages = await redis!.zrange(messagesKey, 0, -1); // 메시지 ID를 시간 역순으로 조회


  return NextResponse.json({ messages });
}






// type Data = {
//   messages: Message[];
// }

// type ErrorData = {
//   body: String;
// }




// export async function GET(
//   req: Request,
//   res: NextApiResponse<Data | ErrorData>
// ) {
   // const pipeline = redis!.pipeline(); // 파이프라인 사용

//   const messageRes = await redis!.hgetall('messages');
//   const messages: Message[] = messageRes 
//     ? Object.values(messageRes)
//       .map((message) => message as Message)
//       .sort((a, b) => a.created_at - b.created_at)
//     : [];
  // const messagesRes = await pipeline.exec(); // 파이프라인 실행

//   return NextResponse.json({ messages });
// }








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