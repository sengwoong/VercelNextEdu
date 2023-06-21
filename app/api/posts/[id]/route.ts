import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getFollowingPostsOf, getPost } from '@/service/posts';
import { withSessionUser } from '@/utils/session';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

//파람에서 값을 들고와서검색합니다.
type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () =>
    getPost(context.params.id) //
      .then((data) => NextResponse.json(data))
  );
}
