import redis from "@/redis";
import { Message } from "@/typings";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  message: Message;
}

type ErrorData = {
  body: string;
}

export async function POST(req: NextRequest) {
 
  const { message } = await req.json();

  const newMessage = {
    ...message,
    created_at: Date.now(),
  }
  if (message === undefined && message === null) {
        return new Response('Bad Request', { status: 400 });
      }
  await redis.hset('messages', message.id, JSON.stringify(newMessage));
NextResponse.json({ message: newMessage })
  


  console.log(newMessage);
}


// export async function POST(req: NextRequest) {
  //   const session = await getServerSession(authOptions);
  //   const user = session?.user;
  
  //   if (!user) {
  //     return new Response('Authentication Error', { status: 401 });
  //   }
  
  //   const { id, comment } = await req.json();
  
  //   if (!id || comment === undefined) {
  //     return new Response('Bad Request', { status: 400 });
  //   }
  
  //   return addComment(id, user.id, comment) //
  //     .then((res) => NextResponse.json(res))
  //     .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  // }

