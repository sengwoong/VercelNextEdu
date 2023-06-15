import { searchUsers } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  console.log("req");
  console.log(req);
  return searchUsers().then((data) => NextResponse.json(data));
}
