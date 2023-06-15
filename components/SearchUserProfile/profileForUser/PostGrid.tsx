import GridSpinner from '@/components/ui/GridSpinner';
import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import PostGridCard from './PostGridCard';
import usePosts from '@/components/hooks/posts';


export default function PostGrid( ) {
  // const {post,isLoading}=useSWR<SimplePost[]>(`/api/users/${username}/${query}`)
  const {
     posts,
    isLoading,
    error,
  } = usePosts()

  return (
    <div className='w-full text-center'>
      {isLoading && <GridSpinner />}
      <ul className='grid grid-cols-3 gap-4 py-4 px-8'>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
