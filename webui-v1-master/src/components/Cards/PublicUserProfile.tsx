import { Card, CardBody } from "@nextui-org/card";
import React from "react";

import { Image } from "@nextui-org/image";
import { UserType } from "@/utils/Types/UserType";

const PublicUserProfile = ({ info }: { info: UserType }) => {
  return (
    <>
      <div className="grid place-content-center mt-3">
        <Card className="w-[380px] sm:w-[500px]">
          <CardBody className="flex flex-col justify-center items-center space-y-1">
            {info.data.avatar != null ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API}/assets/${info.data.avatar}`}
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
                First Name : <span>{info.data.first_name}</span>
              </div>
              <div className="font-semibold">
                Last Name :{info.data.last_name}
              </div>
              <div className="font-semibold">Email :{info.data.email}</div>
              <div className="font-semibold text-center">
                {info.data.description || "No Bio"}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default PublicUserProfile;
