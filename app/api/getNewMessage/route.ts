import redis from "@/redis";
import { Message } from "@/typings";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

type Data = {
  messages: Message[];
};
type ErrorData = {
  body: String;
};

export async function GET(
  req: NextRequest | Request,
  res: NextApiResponse<Data | ErrorData>
) {
  const messageRes = await redis.hgetall("messages");
  const messages: Message[] = Object.values(messageRes)
    .map((message) => JSON.parse(message))
    .sort((a, b) => a.created_at - b.created_at);

    return new NextResponse(
      JSON.stringify({ messages }),
     
    )
}
