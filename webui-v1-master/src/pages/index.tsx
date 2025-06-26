import PostUpload from "@/components/Button/PostUploadButton";
import FeedCard from "@/components/Cards/FeedCard";

import LoadingAllUserPostCard from "@/components/LoadingSkeleton/LoadingAllUserPostCard";

import { getPosts } from "@/utils/apiQueries";
import { PostType } from "@/utils/Types/PostType";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const index = () => {
  const { data, isLoading, isFetching, isSuccess, isFetched } = useQuery({
    queryKey: ["allposts"],
    queryFn: async () => {
      const response = await getPosts();

      if (response !== undefined) {
        return response.json<PostType>();
      }
    },
    refetchOnWindowFocus: false,
  });

  // console.log(data);
  // console.log(typeof data);

  if (data === undefined) {
    if (isLoading || isFetching) {
      return (
        <>
          <div className="container mx-auto max-w-screen-xl p-6">
            <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
              <PostUpload />
              <LoadingAllUserPostCard />
              <LoadingAllUserPostCard />
              <LoadingAllUserPostCard />
              <LoadingAllUserPostCard />
              <LoadingAllUserPostCard />
              <LoadingAllUserPostCard />
            </div>
          </div>
        </>
      );
    }
  }

  if (data !== undefined) {
    // console.log(data);
    if (isSuccess && isFetched) {
      return (
        <>
          <div className="container mx-auto max-w-screen-xl p-6">
            <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
              <PostUpload />
              {data.data.map((items) => {
                return <FeedCard key={items.id} info={items} />;
              })}
            </div>
          </div>
        </>
      );
    }
  }
};

export default index;

/* <FeedCard selfPost={false} /> */
