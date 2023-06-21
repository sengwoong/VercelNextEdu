
import { follow, unfollow } from '@/service/user';
import { withSessionUser } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';


// 나의 팔로우를 확인하여서 팔로우가있으면 해당게시글에 팔로우를하고 없으면 언팔로우하는로직입니다.
export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: targetId, follow: isFollow } = await req.json();
    console.log("isFollow,targetId")
    console.log(isFollow,targetId)
    if (!targetId || isFollow == null) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = isFollow ? follow : unfollow;
    console.log("user.id, targetId")
    console.log(user.id, targetId)
    return request(user.id, targetId) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
