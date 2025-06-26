import { getCurrentUser } from "@/utils/apiQueries";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import React from "react";

import { useQuery } from "@tanstack/react-query";

import LoadingUserDetails from "../LoadingSkeleton/LoadingUserDetails";
import ProfilePicUpdate from "../Modal/ProfilePicUpdate";
import ProfilleDetailsUpdate from "../Modal/ProfileDetailsUpdate";
import { UserType } from "@/utils/Types/UserType";

const UserDetails = () => {
  const { data, isLoading, isFetching, isSuccess, isFetched } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const res = await getCurrentUser();

      if (res !== undefined) {
        return res.json<UserType>();
      }
    },

    refetchOnWindowFocus: false,
  });

  if (data === undefined) {
    // console.log(data);
    if (isLoading || isFetching) {
      return (
        <>
          <LoadingUserDetails />
        </>
      );
    }
  }

  //   console.log(data);

  if (data !== undefined) {
    // console.log(data.data.first_name);
    if (isFetched && isSuccess) {
      return (
        <>
          <div className="grid place-content-center mt-3">
            <Card className="w-[380px] sm:w-[500px]">
              <CardBody className="flex flex-col justify-center items-center space-y-1">
                {data.data.avatar !== null ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API}/assets/${data.data.avatar}`}
                    className="cursor-pointer object-cover w-40 h-40 "
                    radius="full"
                    alt="Profile image"
                  />
                ) : (
                  <Image
                    src={"https://avatar.iran.liara.run/public/boy"}
                    className="cursor-pointer object-cover w-40 h-40 "
                    radius="full"
                    alt="Profile image"
                  />
                )}

                <div className="flex flex-col items-center">
                  <div className="font-semibold">
                    First Name : <span>{data.data.first_name}</span>
                  </div>
                  <div className="font-semibold">
                    Last Name :{data.data.last_name}{" "}
                  </div>
                  <div className="font-semibold">Email : {data.data.email}</div>
                  <div className="font-semibold text-center">
                    {data.data.description || "No Bio"}
                  </div>
                </div>

                <div className="space-x-4 flex justify-center items-center">
                  <ProfilePicUpdate id={data.data.avatar} />
                  <ProfilleDetailsUpdate authdata={data} />
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      );
    }
  }
};

export default UserDetails;
