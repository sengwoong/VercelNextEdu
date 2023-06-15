"use client"
import React ,{useState}from "react";

function LogoutButton() {
  //useState 를해서 초기값을 0으로하고 클릭하면 1을하여 Messagecomponents.tsx를 재랜더 시키기
  const [pushUnderChatting, setpushUnderChatting] = useState(0);
  
  return (
    <button onClick={()=>setpushUnderChatting(1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Sign Out
    </button>
  );
}

export default LogoutButton;
