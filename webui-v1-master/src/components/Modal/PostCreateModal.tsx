import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { Textarea } from "@nextui-org/input";

import { useQueryClient } from "@tanstack/react-query";
import { uploadPost } from "@/utils/apiQueries";
import { postSchema, PostSchemaType } from "@/utils/zodschema";
import React from "react";

const PostCreate = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const queryClient = useQueryClient();

  const [selectedImage, setSelectedImage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
  });

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSuccessfullySelected: () => {
      setSelectedImage(true);
    },
    onClear: () => {
      setSelectedImage(false);
    },
  });

  const clearImg = () => {
    clear();
    reset();
  };

  const postFn = async (postData: PostSchemaType) => {
    await uploadPost(postData, plainFiles);
    // console.log(postCreate);
    onOpenChange();

    queryClient.refetchQueries({ queryKey: ["allposts"] });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {filesContent.map((file, index) => (
          <img
            src={file.content}
            key={index}
            alt={file.name}
            width={290}
            className="rounded-md object-contain"
          />
        ))}

        {!selectedImage && (
          <Button color="primary" onPress={openFilePicker}>
            Select File
          </Button>
        )}
      </div>
      {selectedImage && (
        <form
          action=""
          className="grid grid-cols-2 place-items-center gap-4"
          onSubmit={handleSubmit(postFn)}
        >
          <Textarea
            {...register("caption")}
            placeholder="Write something about your post"
            radius="sm"
            color="primary"
            className="col-span-2"
            variant="underlined"
            errorMessage={errors.caption?.message}
            isInvalid={!!errors.caption?.message}
          />
          <Button
            onPress={clearImg}
            radius="sm"
            type="submit"
            color="danger"
            variant="shadow"
            fullWidth
          >
            Cancel
          </Button>
          <Button
            isLoading={isSubmitting}
            radius="sm"
            type="submit"
            color="secondary"
            variant="shadow"
            fullWidth
          >
            Create Post
          </Button>
        </form>
      )}
    </>
  );
};

export default PostCreate;
