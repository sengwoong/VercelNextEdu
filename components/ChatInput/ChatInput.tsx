// 채팅창에서 채팅을 적고 클릭하여 보내는로직입니다.
import { FormEvent, useContext, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { v4 as uuid } from "uuid";
import { AuthUser } from "@/model/user";

import { useUnderScrollerInChat } from "@/components/ChatList/useUnderScrollerInChat";
import fetcher from "@/utils/fetchGetMessages";
import { Message } from "@/types/typing";
import { uploadMessageToUpstash } from "./ChatInputFetch";

type Props = {
  user: AuthUser | undefined;
};

function ChatInput({ user }: Props) {
  // send 를 누를때마다
  const { counter, setCounter } = useContext(useUnderScrollerInChat);
  const [input, setInput] = useState("");
  const { data: messages } = useSWR("api/addMessage", fetcher);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return <div>로그인중</div>;
  }

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    const messageToSend = input;

    const message: Message = {
      id: uuid(),
      message: messageToSend,
      created_at: Date.now(),
      userName: user.username,
      profilePic: user.image || "",
      email: user.email || "",
      nickName: user.name || "",
    };

    setInput("");

    // 패치로 보내보았습니다.

    await uploadMessageToUpstash(message);
    setCounter((counter) => counter + 1);
    mutate("api/addMessage");
  };

  const handleRefocusChat = () => {
    inputRef.current?.focus();
    setCounter((counter) => counter + 1);
  };

  return (
    <form
      onSubmit={addMessage}
      className="z-50 h-15vh flex px-10 flex-shrink-0 py-5 space-x-2 border-t border-gray-100"
    >
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter message here.."
        className="flex-1 ButtonSubminBlue"
      />
      <button
        onClick={handleRefocusChat}
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
