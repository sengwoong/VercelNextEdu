"use client";
import useSwr from 'swr'

import { Message } from "@/typings";
import { profile } from "console";
import React, { FormEvent, useState ,useRef, useContext} from "react";
import {v4 as uuid} from 'uuid';
import fetcher from '@/utils/fetchMessages';

import { useUnderScrollerInChat } from '@/components/ChatList/useUnderScrollerInChat';
import { AuthUser } from '@/model/user';

type Props = {
  user: AuthUser|undefined;
};



function ChatInput({ user }: Props) {
  const {counter, setCounter } = useContext(useUnderScrollerInChat);
  const [input, setInput] = useState("");
  const {data:messages,error,mutate} = useSwr('api/addMessages',fetcher);
  const InputClick = useRef<HTMLInputElement|null>(null);
  //console.log(messages,"addMessages머임")
  
  if (!user) {
    // 로그인으로 보내기
   return <div>로그인중</div>
  }

  

const ReFocuseChat = ()=>{
  if (InputClick.current) {

  InputClick.current.focus();
  }
  setCounter((counter) => counter + 1);

}
// HTML 폼에서 "submit" 이벤트가 발생하면 기본적으로 페이지가 새로고침되고, 
// 이때 입력한 데이터가 서버로 전송됩니다. 하지만 이 함수에서 "e.preventDefault()"를
//  호출하면 폼의 기본 동작을 막을 수 있으므로
// , 입력한 데이터를 서버로 전송하지 않고 자바스크립트 코드에서 처리할 수 있습니다.
  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    const messageToSend = input;
    let message: Message = {
      id: "",
      message: "",
      created_at: 0,
      userName: "",
      profilePic: "",
      email: "",
      nickName: "",
    };
    
    setInput("");
//이거 jwt로들고오는로직으로 바꿔야함
    const id =uuid();
    //아래는 로그인한걸들고와야함(디비에서)

    if (user !== undefined) {
      const { image ='', username, name, email=''} = user;
       

     message ={
      id,
      message:messageToSend,
      created_at: Date.now(),
      userName: username,
      profilePic: image  ,
      email: email,
      nickName: name,
//  id,
//       message:messageToSend,
//       created_at: Date.now(),
//       userName: "bob",
//       profilePic: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"  ,
//       email: "bob@gmail.com",
//       nickName: "B ob  ",

    }
  }
    console.log('addMessage')
const uploadMessageToUpstash = async () => {
const data =await fetch('/api/addMessage',{
  
  
  method:'POST',
  headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify({message})
    }).then((res) => res.json())
  
    return [data.messafe, ...messages!]
    
  };
  //console.log('uploadMessageToUpstash ')
  uploadMessageToUpstash()

  await mutate(uploadMessageToUpstash,{
    optimisticData:[message,...messages!],
    rollbackOnError:true 
  })
}
  return (

    <form
      onSubmit={addMessage}
      className="  z-50 h-15vh flex px-10 flex-shrink-0 py-5 space-x-2 border-t border-gray-100"
    >
      

      <input
         ref={InputClick}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter message here.."
        className="flex-1 ButtonSubminBlue"
      />

      <button
      onClick={ReFocuseChat}
        disabled={!input}
        type="submit"
        className="ButtonDisabledBlue"
      >
        Send
      </button>
    </form>

  );

}
export default ChatInput;
