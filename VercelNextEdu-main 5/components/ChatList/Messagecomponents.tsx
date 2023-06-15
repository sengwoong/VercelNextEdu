import { useContext, useEffect, useRef } from "react";

import { useUnderScrollerInChat } from '@/components/ChatList/useUnderScrollerInChat';
import { AuthUser } from "@/model/user";
import Avatar from "../LoginInput/Avatar";
import { usePathname } from "next/navigation";
import { Message } from "@/types/typing";

type Props = {
  message: Message;
  user: AuthUser | undefined;
};

function Messagecomponents({ message, user }: Props) {
  const pathName = usePathname();
  const chatRef = useRef<null | HTMLDivElement>(null);
  const { counter } = useContext(useUnderScrollerInChat);

  let isUser = false;
  let isMe = false;
  const ParamUserId = pathName!.split('/')[2];

  if (user) {
    const { name: SessionName } = user;

    if (SessionName === message.nickName) {
      isUser = true;
    } else {
      isUser = false;
    }

    if (ParamUserId === message.userName) {
      isMe = true;
    } else {
      isMe = false;
    }
  }

  useEffect(() => {
    if (chatRef.current) {
      const chatContainer = chatRef.current.parentElement;
      if (chatContainer) {
        if (
          chatContainer.scrollTop + chatContainer.scrollTop / 3 >
            chatContainer.scrollHeight ||
          chatContainer.scrollTop === 0
        ) {
          chatRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [counter]);

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (!user) {
    return <div>로그인중</div>;
  }

  const { image, username, name: SessionName, email } = user;

  return (
    <div
      onDragStart={handleDragStart}
      className={`flex w-fit ${!isMe && "ml-auto"}`}
      ref={chatRef}
    >
      <div className={`flex-shrink-0 ${!isMe && "order-2"}`}>
        <Avatar image={message.profilePic} highlight size="medium" />
      </div>
      <div>
        <p className="text-[0.65rem] px-[2px] pb-[2px]">{message.userName}</p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? "bg-blue-400" : "bg-red-400"
            }`}
          >
            <p>{message.message}</p>
          </div>
          <p className="text-[0.3rem]">
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Messagecomponents;
