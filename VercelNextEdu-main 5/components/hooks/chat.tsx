import React from "react";
import useSWR from "swr";
import fetcherMessages from "@/utils/fetchGetMessages";
import { Message } from "@/types/typing";

const Chat = () => {
  const { data, error, mutate } = useSWR<Message[]>("/api/getNewMessage", fetcherMessages, {
    refreshInterval: 500,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error };
};

export default Chat;
