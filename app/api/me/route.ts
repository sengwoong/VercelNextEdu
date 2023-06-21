import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getUserByUsername } from '@/service/user';
import { withSessionUser } from '@/utils/session';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// 서버 세션을 가져와서 리턴합니다.
export async function GET() {
  return withSessionUser(async (user) =>
    getUserByUsername(user.username) //
      .then((data) => NextResponse.json(data))
  );
}

