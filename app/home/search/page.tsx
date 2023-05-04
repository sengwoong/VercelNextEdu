import UserSearch from '@/components/Usersearch/UserSearch'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'User Search',
  description: 'Search users to follow',
};



export default function page() {
  return (
    <UserSearch/>
  )
}
