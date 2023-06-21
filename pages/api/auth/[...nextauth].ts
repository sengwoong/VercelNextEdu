import {
  addUser,
  getUserByUsername,
  getUserByUsernameLoing,
  getUserEmail,
  getUserEmailOAuth,
} from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { userInfo } from "os";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
let userContent: any = null;
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),

    CredentialsProvider({
      // 여기서 입력한 이름을 "signIn(이름)" 형태로 사용
      type: "credentials",
      // 여기서 작성한 타입 그대로 아래 "authorize()"의 "credentials"의 타입 적용
      // 또한 "next-auth"에서 생성해주는 로그인창에서 사용 ( http://localhost:3000/api/auth/signin )
      credentials: {
        id: {
          label: "고유번호",
          type: "text",
          placeholder: "없으면 ",
        },
        email: {
          label: "이메일",
          type: "email",
          placeholder: "email 입력하세요.",
        },
        lecture: {
          label: "선생님",
          type: "text",
          placeholder: "선생님 인지 확인하세요.",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "password을 입력하세요.",
        },
      },

      // 로그인 유효성 검사
      // 로그인 요청인 "signIn("credentials", { id, password })"에서 넣어준 "id", "password"값이 그대로 들어옴
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.");
        } else {
          // console.log(credentials)
          return credentials;
        }
      },
    }),
  ],
  // ...add more providers here

  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({
      user: { id, name, image, email },
      account,
      profile,
      credentials,
    }) {
      console.log("signIn 까지옴");
      if (!email) {
        return false;
      }
      if (account?.type == "oauth") {
        userContent = await getUserEmailOAuth(email);
        if (userContent === null && undefined) {
          return false;
        }
      }
      console.log("account ");
      console.log(account);
      console.log(account?.type);
      if (account?.type == "credentials") {
        console.log("credentials까지옴");
        // console.log

        // console.log("credentials")
        if (credentials && credentials.email && credentials.password) {
          console.log("if문까지옴");
          userContent = await getUserEmail(
            credentials.email as string,
            credentials.password as string
          );
          console.log("callbackuserContent");
          console.log(userContent);
          console.log("callbackuserContent");
        }

        if ((userContent == null) == undefined) {
          return false;
        }
        console.log("callbackuserContent");
        console.log(userContent);
        console.log("callbackuserContent");
      }

      return true;
    },
    async session({ session, token }) {
      const user = session?.user;

      session.user = {
        ...user,

        username: user.email?.split("@")[0] || "",
        id: token._idx as string,
        name: token.name as string,
        image: token.image as string,
      };

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.email?.split("@")[0] || "";
      }

      if (userContent !== null) {
        token.lecture = userContent[0].lecture;
        token.live = userContent[0].live;
        (token._idx = userContent?.[0]._id),
          (token.name = userContent?.[0].name),
          (token.image = userContent?.[0].image);
      }

      return token;
    },
  },
};
export default NextAuth(authOptions);
