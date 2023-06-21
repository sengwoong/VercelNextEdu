
import { dislikePost, likePost } from '@/service/posts';
import { setLiveStatus } from '@/service/user';
import { withSessionUser } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';


//라이브를 가져와서 자신의라이브를 변경합니다.
export async function PUT(req: NextRequest) {

    const { id, live } = await req.json();


    if (!id || live == null) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = setLiveStatus;

    return request(id, live) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  
}
