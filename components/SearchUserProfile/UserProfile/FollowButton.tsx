'use client';
import useMe from '@/components/hooks/me';
import Button from '@/components/ui/Button';
import {  ProfileUser } from '@/model/user';
import { useRouter } from 'next/navigation';

import { useState, useTransition } from 'react';
import { PulseLoader } from 'react-spinners';



type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser,toggleFollow} = useMe();

//useRouter
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;
//useRouter
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';
//console.log(loggedInUser)

const handleFollow = async () => {
  setIsFetching(true);//useRouter
 await toggleFollow(user.id, !following)
 setIsFetching(false);//useRouter
 startTransition(()=>{
  router.refresh();
 });//useRouter
};
  return (
    <>
    {showButton && (
      <div className='relative'>
        {isUpdating && (
          <div className='absolute z-20 inset-0 flex justify-center items-center'>
            <PulseLoader size={6} />
          </div>
        )}
        <Button
          disabled={isUpdating}
          text={text}
          onClick={handleFollow}
          red={text === 'Unfollow'}
        />
      </div>
    )}
  </>
  );
}
//https://beta.nextjs.org/docs/data-fetching/mutating