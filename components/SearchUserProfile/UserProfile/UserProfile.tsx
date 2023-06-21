// 포로파일 페이지입니다.

"use client";
import LiveButton from "@/components/live/livebutton";
import { ProfileUser } from "@/model/user";
import Avatar from "../../LoginInput/Avatar";
import FollowButton from "./FollowButton";
import Link from "next/link";
import { useState } from "react";
import useMe from "@/components/hooks/me";
import { setLiveStatus } from "@/service/user";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const {
    image,
    username,
    name,
    followers,
    following,
    posts,
    lecture,
    live,
    id,
  } = user;
  const { user: userData, toggleLive } = useMe();
  const [isLive, setIsLive] = useState(live);

  const handleClick = () => {
    const updatedIsLive = !isLive;
    setIsLive(updatedIsLive);
    if (updatedIsLive !== undefined) {
      toggleLive(id, updatedIsLive);
    }
  };

  const info = [
    { title: "posts", data: posts },
    { title: "followers", data: followers },
    { title: "following", data: following },
  ];

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300">
      <Avatar image={image} highlight size="xlarge" />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col items-center md:flex-row">
          <h1 className="text-2xl md:mr-8 my-2 md:mb-0">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className="font-bold mr-1">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">{name}</p>

        <div>
          {lecture === "teacher" ? (
            isLive === true ? (
              <Link href={`/StudyRoom/${username}`} aria-label="Home">
                <p className="text-xl font-bold text-center md:text-start">
                  onAir
                </p>
              </Link>
            ) : (
              <p className="text-xl font-bold text-center md:text-start">
                방송하기
              </p>
            )
          ) : (
            <p className="text-xl font-bold text-center md:text-start">
              학생계정
            </p>
          )}
          <div>
            {username === (userData?.username ?? "") && (
              <LiveButton isLive={isLive} handleClick={handleClick} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
