import { Card, CardBody } from "@nextui-org/card";

import { Image } from "@nextui-org/image";
import Link from "next/link";
import { PostTypeSingle } from "@/utils/Types/PostType";
import LikeButton from "../Button/LikeButton";

// ({ selfPost }: FeedCardProps)

// type FeedCardProps = {
//   selfPost: boolean;
// };

const FeedCard = ({ info }: { info: PostTypeSingle }) => {
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
    <Card className="w-[360px] px-1 mt-4">
      <CardBody className="space-y-2">
        <div className="flex justify-start gap-3 items-center">
          <Link href={`profile/${info.user_created.id}`}>
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
          {/* {selfPost && <Trash />} */}
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

        <div className="flex items-center">
          <LikeButton postid={info.id} />
          <div className="ml-3">{info.likes.length}</div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FeedCard;
