
import useMe from '@/components/hooks/me';
import usePosts from '@/components/hooks/posts';
import ToggleButton from '@/components/ui/ToggleButton';
import BookmarkFillIcon from '@/components/ui/icons/BookmarkFillIcon';
import BookmarkIcon from '@/components/ui/icons/BookmarkIcon';
import HeartFillIcon from '@/components/ui/icons/HeartFillIcon';
import HeartIcon from '@/components/ui/icons/HeartIcon';
import { Comment, SimplePost } from '@/model/post';
import { parseDate } from '@/utils/date';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import CommentForm from '../Postcomment/CommentForm';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment:(comment:Comment)=>void
};
export default function ActionBar({ post, children,onComment }: Props) {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };
const handleComment=(comment:string)=>{
  user && onComment({comment,username: user.username,image:user.image})
}
  return (
    <>
      <div className='flex justify-between my-2 px-4'>
        <ToggleButton
          title='Like'
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          title='Bookmark'
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className='px-4 py-1'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {children}
        <p className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
