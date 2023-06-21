//메세지 전체틀인 로직입니다 (pdf 오른쪽에있는 메세지입니다.)

"use client";
import React, { useState } from "react";
import ChatInput from "@/components/ChatInput/ChatInput";
import MessageList from "@/components/ChatList/MessageList";
import Header from "@/components/ChatHeader/Header";
import { useUnderScrollerInChat } from "@/components/ChatList/useUnderScrollerInChat";
import { useSession } from "next-auth/react";
function MessageSystem() {
  const [counter, setCounter] = useState(0);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex">
      <useUnderScrollerInChat.Provider value={{ counter, setCounter }}>
        <div className="bg-white  w-96 h-screen ">
          <Header />
          <MessageList user={user} />
          <ChatInput user={user} />
        </div>
      </useUnderScrollerInChat.Provider>
    </div>
  );
}

export default MessageSystem;
