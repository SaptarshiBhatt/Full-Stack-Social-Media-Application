import Link from "next/link";
import { Image } from "@nextui-org/image";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/utils/apiQueries";
import { UserType } from "@/utils/Types/UserType";
import { Skeleton } from "@nextui-org/skeleton";

const UserNav = () => {
  const { data, isFetching, isLoading, isSuccess, isFetched } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const res = await getCurrentUser();

      if (res === undefined) {
        return;
      }
      if (res !== undefined) {
        // console.log(res);
        return res.json<UserType>();
      }
    },
  });

  // console.log(data);

  if (data === undefined) {
    if (isFetching || isLoading) {
      <div className="flex items-center gap-2">
        <div className="text-pretty font-medium">
          <Skeleton className="rounded-2xl">Users Name Ranjana kundu</Skeleton>
        </div>

        <Link href={"/profile/privateprofile"} className="rounded-full">
          <div className="w-11 h-11">
            <Skeleton className="rounded-2xl">
              <Image
                className="cursor-pointer object-cover w-11 h-11 rounded-full"
                src={`https://avatar.iran.liara.run/public/boy`}
                alt="Profile image"
              />
            </Skeleton>
          </div>
        </Link>
      </div>;
    }
  }

  if (data !== undefined) {
    if (isFetched && isSuccess) {
      return (
        <div className="flex items-center gap-2">
          <div className="text-pretty font-medium">{data.data.first_name}</div>

          <Link href={"/profile/privateprofile"} className="rounded-full">
            <div className="w-11 h-11">
              {data.data.avatar === null ? (
                <Image
                  className="cursor-pointer object-cover w-11 h-11 rounded-full"
                  src={"https://avatar.iran.liara.run/public/boy"}
                  alt="Profile image"
                />
              ) : (
                <Image
                  className="cursor-pointer object-cover w-11 h-11 rounded-full"
                  src={`${process.env.NEXT_PUBLIC_API}/assets/${data.data.avatar}`}
                  alt="Profile image"
                />
              )}
            </div>
          </Link>
        </div>
      );
    }
  }
};

export default UserNav;
