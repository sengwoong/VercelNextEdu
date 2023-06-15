"use client"  

import React,{useState} from "react";

import Messagecomponents from "./Messagecomponents";
import { AuthUser } from "@/model/user";

import redis from "@/redis";
import getMessage from "../hooks/chat";



type Props = {
  user: AuthUser|undefined;
};






function MessageList({ user }: Props): JSX.Element {
  const { data: messages, error } = getMessage();



  (async () => {
    try {
      await redis.ping();
      console.log('Upstash Redis connected successfully.');
    } catch (error) {
      console.error('Failed to connect to Upstash Redis.');
    }
  })();
  
  console.log(messages, "최종값")
  return (
    <>
      <div className="h-70vh space-y-5 flex flex-col justify-start px-0 pb-2 pt-8 overflow-y-scroll">
        {messages?.map((messageAll) => (
          <Messagecomponents user={user} key={messageAll.id} message={messageAll} />
        ))}
      </div>
    </>
  );
}

export default MessageList;
