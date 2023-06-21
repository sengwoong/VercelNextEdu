import { searchUsers } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';


//모든유저를들고옵니다.
export async function GET(req: NextRequest) {

  return searchUsers().then((data) => NextResponse.json(data));
}
