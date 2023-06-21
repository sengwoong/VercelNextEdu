// 채팅창의 해더부분입니다.
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="h-15vh top-0 z-50 bg-white flex items-center p-10 shadow-sm">
      <Link href="/home">
        <p className="text-blue-400"> Gang-E </p>
      </Link>

      {/* <ResizableMemo/> */}

      <div className="flex space-x-2">
        <div className="m-auto max-h-32 max-w-fit"></div>
      </div>
    </header>
  );
}

export default Header;
