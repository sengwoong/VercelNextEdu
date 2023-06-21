import { searchUsers } from "@/service/user";
import { NextResponse, NextRequest } from "next/server";

type Context = {
  params: {
    keyword: string;
  }
};

// 파람으로 어떠한유저가 있는지검색합니다.
export async function GET(req: NextRequest, context: Context) {
  return searchUsers(context.params.keyword)
    .then((data) => NextResponse.json(data));
}
