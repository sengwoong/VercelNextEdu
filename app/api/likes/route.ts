
import { dislikePost, likePost } from '@/service/posts';
import { withSessionUser } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';


//좋아요 번틀을 눌렀을때 해당개시글에 있으면 삭제 없으면 추가합니다.
export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, like } = await req.json();

    if (!id || like == null) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = like ? likePost : dislikePost;

    return request(id, user.id) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
