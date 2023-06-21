//기본적이게 모두 로드할 레이아웃입니다.
import Navbar from "@/components/LoginInput/AuthNavbar";
import TransitionEffect from "@/components/PageEffect/TransitionEffect";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Instantgram",
    template: "Instantgram | %s",
  },
  description: "Instantgram Photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />

      <body>
        <Navbar></Navbar>
        {children}

        <div id="portal"></div>
      </body>
    </html>
  );
  //
}
