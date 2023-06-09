// 모든 포스트리스트를 보여주고 보여지기전에는 GridSpiner 으로 로딩창을만들었습니다.
"use client";

import PostListCard from "./PostCard/PostListCard";
import GridSpiner from "../ui/Spiner/GridSpiner";
import usePosts from "../hooks/posts";

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();
  //console.log(posts);

  return (
    <section>
      {loading && (
        <div className="w-fit mx-auto">
          <GridSpiner color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id}>
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
