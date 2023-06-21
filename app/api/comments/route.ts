
import { addComment } from '@/service/posts';
import { withSessionUser } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';


//포스트에 id 를 들고와서 커맨드를 추가하는 로직입니다.

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment } = await req.json();

    if (!id || comment == null) {
      return new Response('Bad Request', { status: 400 });
    }

    return addComment(id, user.id, comment) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}




// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   const user = session?.user;

//   if (!user) {
//     return new Response('Authentication Error', { status: 401 });
//   }

//   const { id, comment } = await req.json();

//   if (!id || comment === undefined) {
//     return new Response('Bad Request', { status: 400 });
//   }

//   return addComment(id, user.id, comment) //
//     .then((res) => NextResponse.json(res))
//     .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
// }

