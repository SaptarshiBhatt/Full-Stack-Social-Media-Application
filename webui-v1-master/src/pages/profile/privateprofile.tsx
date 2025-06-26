import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserPosts } from "@/utils/apiQueries";
import { PostType } from "@/utils/Types/PostType";
import UserDetails from "@/components/Cards/UserDetails";
import UserPostFeedCard from "@/components/Cards/UserPostFeedCard";
import LoadingUserDetails from "@/components/LoadingSkeleton/LoadingUserDetails";
import LoadingAllUserPostCard from "@/components/LoadingSkeleton/LoadingAllUserPostCard";
import PostUpload from "@/components/Button/PostUploadButton";

const privateprofile = () => {
  const { data, isLoading, isFetching, isSuccess, isFetched } = useQuery({
    queryKey: ["getMePost"],
    queryFn: async () => {
      const res = await getCurrentUserPosts();
      if (res !== undefined) {
        return res.json<PostType>();
      }
    },
    refetchOnWindowFocus: false,
  });

  console.log(data);

  if (data === undefined) {
    if (isLoading || isFetching) {
      return (
        <>
          <LoadingUserDetails />
          <div className="container mx-auto max-w-screen-xl p-6">
            <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    if (isFetched && isSuccess) {
      return (
        <>
          <PostUpload />
          <UserDetails />

          <div className="container mx-auto max-w-screen-xl p-6">
            <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.data.map((items) => {
                return <UserPostFeedCard key={items.id} info={items} />;
              })}
            </div>
          </div>
        </>
      );
    }
  }
};
export default privateprofile;
