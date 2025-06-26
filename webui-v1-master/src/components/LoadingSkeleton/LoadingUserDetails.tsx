import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

const LoadingUserDetails = () => {
  return (
    <>
      <div className="grid place-content-center mt-3">
        <Card className="w-[380px] sm:w-[500px]">
          <CardBody className="flex flex-col justify-center gap-1 items-center">
            <Skeleton className="rounded-full">
              <Image
                src={`https://avatar.iran.liara.run/public/boy`}
                className="cursor-pointer object-cover w-40 h-40 "
                radius="full"
                alt="Profile image"
              />
            </Skeleton>
            <div className="flex flex-col items-center gap-2">
              <div className="font-semibold">
                <Skeleton className="rounded-2xl">
                  Ranjana kundu++++++++
                </Skeleton>
              </div>
              <div className="font-semibold">
                <Skeleton className="rounded-2xl">
                  Ranjana kundu++++++++
                </Skeleton>
              </div>
              <Skeleton className="rounded-2xl">
                Ranjana kundu+++++++++++++++++
              </Skeleton>
              <div className="font-semibold text-center">
                <Skeleton className="rounded-2xl">
                  Ranjana kundu++++++++
                </Skeleton>
              </div>
            </div>

            <div className="space-x-4 flex justify-center items-center">
              {/* <ProfilePicUpdate id={data?.data.avatar} />
                  <ProfilleDetailsUpdate authdata={data} /> */}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default LoadingUserDetails;
