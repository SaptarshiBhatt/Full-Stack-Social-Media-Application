import PublicUserPostCard from "@/components/Cards/PublicUserPostCard";
import PublicUserProfile from "@/components/Cards/PublicUserProfile";
import LoadingAllUserPostCard from "@/components/LoadingSkeleton/LoadingAllUserPostCard";
import LoadingUserDetails from "@/components/LoadingSkeleton/LoadingUserDetails";

import { publicProfile } from "@/utils/apiQueries";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

const public_id = () => {
  const { query } = useRouter();

  const id = query.public_id as string | undefined;

  console.log(id);
  if (id === undefined) {
    return;
  }

  const { data, isLoading, isFetched, isSuccess, isFetching } = useQuery({
    queryKey: ["publicUser", id],
    queryFn: async () => {
      const res = await publicProfile(id);

      if (res !== undefined) {
        return res;
      }
    },

    refetchOnWindowFocus: false,
  });

  if (data === undefined) {
    console.log(data);
    if (isLoading || isFetching) {
      return (
        <>
          <LoadingUserDetails />
          <div className="container mx-auto max-w-screen-xl p-6">
            <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    console.log(data);
    if (isFetched && isSuccess) {
      return (
        <>
          <PublicUserProfile info={data} />
          <div className="container mx-auto max-w-screen-xl p-6">
            <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
              <PublicUserPostCard detail={data} />
            </div>
          </div>
        </>
      );
    }
  }
};
export default public_id;
