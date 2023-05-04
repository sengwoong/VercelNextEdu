import "../styles/globals.css";
import {ReduxProvider} from '@/app/ReduxProvider'
import Auth from '@/components/LoginInput/AuthNavbar';
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";
import { Metadata } from "next";





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
<SWRConfigContext>
{children}
</SWRConfigContext>
       
        </ReduxProvider>
        </AuthContext>
  <div
  id='portal'></div>
      </body>
    </html>
  );
  // 
}
