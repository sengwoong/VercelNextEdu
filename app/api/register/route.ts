
import { addComment } from '@/service/posts';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {


  const { id, comment } = await req.json();

  if (!id || comment === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

}

//   return addComment(id, user.id, comment) //
//     .then((res) => NextResponse.json(res))
//     .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
// }
