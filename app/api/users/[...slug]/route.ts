
import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    slug: string[];
  };
};

//해당유저의 포스트 세이브한포스트 좋아요표시한 포스트를 slug 에맞게 가져옵니다.
export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [username, query] = slug;

  let request = getPostsOf;
  if (query === 'saved') {
    request = getSavedPostsOf;
  } else if (query === 'liked') {
    request = getLikedPostsOf;
  }

  return request(username).then((data) => NextResponse.json(data));
}
