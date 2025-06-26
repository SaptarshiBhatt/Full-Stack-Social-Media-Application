import { PostTypeSingle } from "@/utils/Types/PostType";

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

import React from "react";
import DeletePostButton from "../Button/DeletePostButton";

const UserPostFeedCard = ({ info }: { info: PostTypeSingle }) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  const date = new Date(info.date_created);
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  const posting_date = formattedDate.replace(/\s(?=[AP]M)/, " ");

  return (
    <>
      <Card className="w-[360px] px-1 mt-4">
        <CardBody className="space-y-2">
          <div className="flex justify-start gap-3 items-center">
            <Link href="/">
              {info.user_created.avatar === null ? (
                <Image
                  src={"https://avatar.iran.liara.run/public/boy"}
                  className="cursor-pointer object-cover w-12 h-12"
                  radius="full"
                  alt="Profile image"
                />
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API}/assets/${info?.user_created.avatar}`}
                  className="cursor-pointer object-cover w-12 h-12"
                  radius="full"
                  alt="Profile image"
                />
              )}
            </Link>

            <div className="flex flex-col">
              <div className="font-bold">
                {info.user_created.first_name} {info.user_created.last_name}
              </div>
              <div className="font-light text-sm">{posting_date}</div>
            </div>
          </div>

          <div className="flex items-center">
            <Image
              className="rounded-xl aspect-square object-cover"
              src={`${process.env.NEXT_PUBLIC_API}/assets/${info?.post_img.id}`}
              height={200}
              alt="Profile image"
            />
          </div>
          <div className="">{info.caption}</div>

          <div className="">
            {info.user_created.first_name !== undefined ? (
              <>
                <DeletePostButton id={info.id} />
              </>
            ) : (
              <> Soemthing Went Wrong </>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default UserPostFeedCard;
