import {
  deleteLikesByPostID,
  getLikesByPostID,
  postLike,
} from "@/utils/apiQueries";
import { Button } from "@nextui-org/button";
import { useQueryClient } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import React from "react";
import { FcDislike, FcLike } from "react-icons/fc";

const LikeButton = ({ postid }: { postid: string }) => {
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();

  const sendLike = async () => {
    if (!isLiked) {
      await postLike(postid);
      //   await new Promise<void>((r) => setTimeout(r, 4000));
      setIsLiked(true);
      queryClient.invalidateQueries({
        queryKey: ["allposts"],
      });
    }
  };
  const deleteLike = async () => {
    if (isLiked) {
      await deleteLikesByPostID(postid);

      setIsLiked(false);
      queryClient.invalidateQueries({
        queryKey: ["allposts"],
      });
    }
  };

  useEffect(() => {
    const getLikesforThisPost = async () => {
      const likesOnThisPost = await getLikesByPostID(postid);

      if (likesOnThisPost !== undefined) {
        if (likesOnThisPost.data.length === 1) {
          setIsLiked(true);
        }
      }
    };

    getLikesforThisPost();
  }, [postid]);

  if (isLiked === true) {
    return (
      <>
        <Button onPress={deleteLike} size="md" variant="light" isIconOnly>
          <FcLike size={30} />
        </Button>
      </>
    );
  }

  if (isLiked === false) {
    return (
      <>
        <Button onPress={sendLike} size="md" variant="light" isIconOnly>
          <FcDislike size={30} />
        </Button>
      </>
    );
  }
};

export default LikeButton;
