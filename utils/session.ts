import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { AuthUser } from "@/model/user";

export async function withSessionUser(
  handler: (user: AuthUser) => Promise<Response>
): Promise<Response> {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  // console.log(session)
  // console.log("utilsSessionsUser")
  // console.log(user)
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return handler(user);
}
