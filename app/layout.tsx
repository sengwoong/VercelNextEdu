import "../styles/globals.css";
import { ReduxProvider } from "@/app/ReduxProvider";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";

//리덕스 auth swr기본설정 portal 을 추가하였습니다.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />

      <body>
        <AuthContext>
          <ReduxProvider>
            <SWRConfigContext>{children}</SWRConfigContext>
          </ReduxProvider>
        </AuthContext>
        <div id="portal"></div>
      </body>
    </html>
  );
  //
}
