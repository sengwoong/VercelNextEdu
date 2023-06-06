
import { dislikePost, likePost } from '@/service/posts';
import { setLiveStatus } from '@/service/user';
import { withSessionUser } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {

    const { id, live } = await req.json();

    console.log("여기까지옴")
    if (!id || live == null) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = setLiveStatus;
    console.log("여기에러아님")
    return request(id, live) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  
}
