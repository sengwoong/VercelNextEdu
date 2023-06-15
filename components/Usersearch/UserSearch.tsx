"use client"

import {  SearchUser } from '@/model/user';
import React, { FormEvent, useState } from 'react'
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import GridSpiner from '../ui/Spiner/GridSpiner';
import UserCard from './userCaed/UserCard';
import useDebounce from '@/components/hooks/debounc'
export default function UserSearch() {

  const [keyword,setkeyword]= useState('');
  const debouncedKeyword=useDebounce(keyword,500);
  const {data:users,isLoading,error}=useSWR<SearchUser[]>(`/api/usersearch/${debouncedKeyword}`);
//console.log(users)
const onsubmit=(e:FormEvent)=>{
e.preventDefault();
}


  return (
    <div className='w-10/12 mx-auto'>
      <form onSubmit={onsubmit}   className='text-center'>
        <input type='text' autoFocus placeholder='Search for a username or name'
        value={keyword} onChange={(e)=>setkeyword(e.target.value)}
        className='mx-auto w-10/12 h-11  border border-black rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
        >
      

        </input>

      </form>
      {error && <p> 무언가잘못됌</p>}

      {isLoading&&
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div >
      <GridSpiner />
    </div>
  </div>
  
  
     
    }
      {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
      <ul>
        {users && users.map(user=><li key={user.username}> 
        <UserCard user={user}/>
        </li>)}
      </ul>
    </div>
  )
}
