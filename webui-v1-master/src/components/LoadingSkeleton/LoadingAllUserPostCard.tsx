import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

import { Image } from "@nextui-org/image";
import React from "react";

const LoadingAllUserPostCard = () => {
  return (
    <>
      <Card className="w-[360px] px-1 mt-4 grid place-items-center">
        <CardHeader className="flex flex-row  gap-5">
          <Skeleton className="rounded-xl">
            <Image
              radius="full"
              src={"https://avatar.iran.liara.run/public/boy"}
              width={40}
              height={40}
              alt="Profile image"
            />
          </Skeleton>

          <div className="flex flex-col justify-center items-start">
            <div className="font-bold text-sm">
              <Skeleton className="rounded-xl">Ranjana Kundu</Skeleton>
            </div>
            <div className="font-light mt-2">
              <Skeleton className="rounded-xl">08.12.2024</Skeleton>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex items-center">
          <Skeleton className="rounded-3xl">
            <Image
              className="rounded-3xl aspect-square"
              src={"/backgroundimage.JPG"}
              width={300}
              height={200}
              alt="Profile image"
              // isBlurred
            />
          </Skeleton>
          <div className="text-center mt-3">
            <span className="font-extralight">
              <Skeleton className="rounded-2xl ml-3 mr-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              </Skeleton>
            </span>
          </div>
        </CardBody>
        <CardFooter className="">{/* <LoadingLikeBtn /> */}</CardFooter>
      </Card>
    </>
  );
};

export default LoadingAllUserPostCard;
