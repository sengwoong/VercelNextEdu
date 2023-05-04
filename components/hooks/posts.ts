import { useCacheKeys } from '@/context/CacheKeysContext';
import { Comment, SimplePost } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}
async function addComment(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const cacheKeys = useCacheKeys();
  const {
    data: posts, // 현재 API로부터 가져온 데이터
    isLoading, // API로부터 데이터를 가져오는 중인지 나타내는 boolean
    error, // API로부터 데이터를 가져오는 중 오류가 발생했는지를 나타내는 error
    mutate, // SWR을 사용하여 가져온 데이터를 갱신할 수 있는 함수
  } = useSWR<SimplePost[]>(cacheKeys.postsKey); // SWR을 사용하여 API로부터 데이터를 가져옴

  // 좋아요를 누르는 함수
  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username] // 좋아요를 눌렀을 때, 해당 게시물에 유저명 추가
        : post.likes.filter((item) => item !== username), // 좋아요를 취소했을 때, 해당 게시물에서 유저명 제거
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p)); // 현재 API로부터 가져온 데이터에서 해당 게시물을 갱신

    // 좋아요 업데이트를 위해 API로 PUT 요청을 보냄
    // optimisticData: 갱신된 데이터를 먼저 반영하여 빠른 UI 갱신을 위함
    // populateCache: 캐시 데이터를 갱신하지 않음
    // revalidate: 즉시 API로부터 데이터를 다시 가져오지 않음
    // rollbackOnError: API 요청에 실패한 경우 이전 상태로 롤백
    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };



  const postComment = (post: SimplePost, comment: Comment) => {
    const newPost = {
      ...post,
      comments: post.comments + 1,
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };
  return { posts, isLoading, error, setLike, postComment }; // API로부터 가져온 데이터와 좋아요 업데이트 함수를 반환

}

//14-8
// optimisticData:
// optimisticData 매개변수는 mutate 함수가 호출된 후 데이터를 최적화할 수 있게 해줍니다.
// 이 매개변수가 true로 설정되면, mutate 함수는 업데이트된 데이터를 먼저 UI에 반영합니다. 그리고 나서 서버로부터의 응답을 받으면 UI를 갱신합니다.
// 이 옵션은 사용자가 요청을 보냈을 때 업데이트된 데이터가 적용되는 시간을 단축시켜 빠른 UI 갱신을 가능하게 해줍니다.
// populateCache:
// populateCache 매개변수는 mutate 함수가 호출된 후 캐시를 갱신할 지 여부를 결정합니다.
// 이 매개변수를 false로 설정하면, mutate 함수가 호출된 후에도 캐시 데이터가 변경되지 않습니다.
// revalidate:
// revalidate 매개변수는 mutate 함수가 호출된 후 API로부터 데이터를 다시 가져올 지 여부를 결정합니다.
// 이 매개변수를 false로 설정하면, mutate 함수가 호출된 후에도 API로부터 데이터를 다시 가져오지 않습니다.
// rollbackOnError:
// rollbackOnError 매개변수는 API 요청에 실패한 경우에 이전 상태로 롤백할 지 여부를 결정합니다.
// 이 매개변수를 true로 설정하면, API 요청에 실패했을 때 이전 상태로 롤백됩니다. 이전 상태로 롤백되면 UI가 캐시된 데이터와 일치하게 됩니다.




// shouldRetryOnError:

// shouldRetryOnError 매개변수는 API 요청이 실패한 경우 다시 시도할 지 여부를 결정합니다.
// 이 매개변수를 true로 설정하면, API 요청이 실패하면 swr 라이브러리는 자동으로 일정 시간 후 다시 시도합니다.
// 기본값은 true입니다.
// errorRetryCount:

// errorRetryCount 매개변수는 API 요청이 실패한 경우 다시 시도할 횟수를 결정합니다.
// 이 매개변수를 0으로 설정하면, swr 라이브러리는 API 요청이 실패할 때마다 다시 시도하지 않습니다.
// 이 매개변수를 undefined로 설정하면, swr 라이브러리는 기본적으로 5번 시도합니다.
// errorRetryInterval:

// errorRetryInterval 매개변수는 API 요청이 실패한 경우 다시 시도할 간격을 결정합니다.
// 이 매개변수를 1000으로 설정하면, swr 라이브러리는 API 요청이 실패한 후 1초 후에 다시 시도합니다.
// 이 매개변수를 undefined로 설정하면, swr 라이브러리는 기본적으로 5초마다 다시 시도합니다.
// refreshInterval:

// refreshInterval 매개변수는 데이터를 자동으로 다시 가져올 간격을 결정합니다.
// 이 매개변수를 1000으로 설정하면, swr 라이브러리는 데이터를 1초마다 다시 가져옵니다.
// 이 매개변수를 undefined로 설정하면, swr 라이브러리는 데이터를 자동으로 다시 가져오지 않습니다.
// refreshWhenHidden:

// refreshWhenHidden 매개변수는 웹페이지가 숨겨져 있을 때에도 데이터를 자동으로 다시 가져올지 여부를 결정합니다.
// 이 매개변수를 true로 설정하면, 웹페이지가 숨겨져 있을 때에도 데이터를 자동으로 다시 가져옵니다.
// 기본값은 false입니다.
// dedupingInterval:

// dedupingInterval 매개변수는 같은 요청을 여러번 보내는 것을 방지하는 간격을 결정합니다.
// 이 매개변수를 2000으로 설정하면, swr 라이브러리는 2초 이내에 같은 요청을 여러번 보

// useSWR의 옵션들에 대한 자세한 설명은 공식문서에서 확인하실 수 있습니다.

// 옵션들에 대한 설명: https://swr.vercel.app/docs/options

// useSWR에 대한 자세한 사용법: https://swr.vercel.app/docs/usage


