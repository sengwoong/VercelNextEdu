//팔로우 버튼입니다.

"use client";
import { HomeUser } from "@/model/user";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";

import Avatar from "../LoginInput/Avatar";
import ScrollableBar from "../ui/ScrollableBar";
import useMe from "../hooks/me";

export default function FollowingBar() {
  const { user, isLoading: loading, error } = useMe();
  // const users = data?.following;
  // const users = undefined;
  const users = user?.following;

  //console.log(users,"users")
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto">
      {loading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <li key={username}>
              <Link
                className="flex flex-col items-center w-20"
                href={`/home/user/${username}`}
              >
                {username}
                <Avatar image={image} highlight />
                <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                  {username}
                </p>
              </Link>
            </li>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
