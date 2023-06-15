import { SimplePost } from '@/model/post';
import { HomeUser } from '@/model/user';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

async function updateFollow(targetId: string, follow: boolean) {
  return fetch('/api/follow', {
    method: 'PUT',
    body: JSON.stringify({ id: targetId, follow }),
  }).then((res) => res.json());
}

async function updateLive(usserId: string, live: boolean) {
  return fetch('/api/live', {
    method: 'PUT',
    body: JSON.stringify({ id: usserId, live }),
  }).then((res) => res.json());
}


export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user.bookmarks;
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b !== postId),
      };

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );

  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), { populateCache: false });
    },
    [mutate]
  );

  const toggleLive = useCallback(
    (usserId: string, live: boolean) => {
      return mutate(updateLive(usserId, live), { populateCache: false });
    },
    [mutate]
  );


  return { user, isLoading, error, setBookmark, toggleFollow ,  toggleLive};
}






// async function addComment(id: string, comment: string) {
//   return fetch('/api/comments', {
//     method: 'POST',
//     body: JSON.stringify({ id, comment }),
//   }).then((res) => res.json());
// }

