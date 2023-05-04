
import FollowingBar from '@/components/HomPage/FollowingBar';
import PostList from '@/components/HomPage/PostList';
import SideBar from '@/components/HomPage/SideBar';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }






  return (

    
    <div>
         

    <section className='w-11/12 m-auto flex flex-col md:flex-row max-w-[850px] p-4'>
 
      <></>
      <div className='w-full basis-3/4'>
        <FollowingBar />
        <PostList />
      </div>
      <div className='ml-8  basis-1/4'>
        <SideBar user={user} />
      </div>
    </section>
    </div>
  );
}
