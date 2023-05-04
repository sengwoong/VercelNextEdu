"use client"
import React, { useState } from "react";
import ChatInput from '@/components/ChatInput/ChatInput'
import MessageList from '@/components/ChatList/MessageList'
import Header from "@/components/ChatHeader/Header";

import PdfView from '@/components/pdf/pdfviewByDouble';
import { useUnderScrollerInChat } from '@/components/ChatList/useUnderScrollerInChat';
import ResizableMemo from "@/components/Minimenu/Memo/ResizableMemo";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function MessageSystem() {
  const [counter, setCounter] = useState(0);
 

  const { data: session } = useSession();
 
 
  const user = session?.user;
//console.log(user)





  return (
    
<div className="flex"> 

<useUnderScrollerInChat.Provider value={{ counter, setCounter }}>
<div className="bg-white  w-full h-screen ">

<Header  />
<MessageList  user={user}/>
<ChatInput user={user}/>
</div>
</useUnderScrollerInChat.Provider>





    </div>
  );
}

export default MessageSystem;