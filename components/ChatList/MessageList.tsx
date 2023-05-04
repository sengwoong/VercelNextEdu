"use client"  
import { produce, Draft } from "immer";
import { Message } from "@/typings";
import fetcherMessages from "@/utils/fetchMessages";
import fetcherMessage from "@/utils/fetchNewMessage";
import React,{useState} from "react";
import useSWR from "swr";
import useSWRSubscription from "swr";
import Messagecomponents from "./Messagecomponents";
import { AuthUser } from "@/model/user";
import { usePathname } from "next/navigation";



type Props = {
  user: AuthUser|undefined;
};






function MessageList({ user }: Props): JSX.Element {

 


  const { data: messages, error, mutate } = useSWR<Message[]>(
    "api/getMessages",
    fetcherMessages,
    {
      refreshInterval:500,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  //console.log(messages, "최종값")
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
