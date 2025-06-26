import React from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Spinner } from "@nextui-org/spinner";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useFilePicker } from "use-file-picker";
import { updateProfileImage } from "@/utils/apiQueries";

const ProfilePicUpdate = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [pickFile, setPickFile] = useState(false);

  const [loading, setLoading] = useState(false);

  // File Update

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSuccessfullySelected: () => {
      setPickFile(true);
    },
    onClear: () => {
      setPickFile(false);
    },
  });

  console.log(plainFiles);

  // main function backend

  const imageUpload = async () => {
    if (plainFiles.length === 0) {
      toast.success(
        "Already Image Uploaded / Dont Upload Image Plz Up-oad Image"
      );
    }

    if (plainFiles.length === 1) {
      const abc = await updateProfileImage(plainFiles);
      setLoading(true);
      await new Promise<void>((r) => setTimeout(r, 4000));
      if (abc === undefined) {
        toast.error("Error");
      }
      if (abc !== undefined) {
        toast.success("Profile Pic Updated.");
        clear();
        setLoading(false);
        onOpenChange();
      }

      console.log(abc);
    }

    queryClient.refetchQueries({ queryKey: ["getMe"] });
  };

  return (
    <>
      <div className="">
        <Button size="lg" color="secondary" variant="solid" onPress={onOpen}>
          Profile Pic Btn
        </Button>
      </div>

      {/* Modal Code  */}

      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onclose) => (
            <>
              <ModalHeader>Profile Image Upload Section's</ModalHeader>
              <ModalBody className="items-center">
                {!pickFile && (
                  <>
                    <button onClick={openFilePicker}>
                      {id === null ? (
                        <Image
                          className="w-40 h-40 rounded-full object-cover"
                          src={"https://avatar.iran.liara.run/public/boy"}
                          alt="Profile image"
                        />
                      ) : (
                        <Image
                          className="w-40 h-40 rounded-full object-cover"
                          src={`${process.env.NEXT_PUBLIC_API}/assets/${id}`}
                          alt="Profile image"
                        />
                      )}
                    </button>
                  </>
                )}
                {filesContent.map((file, index) => (
                  <div key={index}>
                    <Image
                      width={200}
                      height={200}
                      src={file.content}
                      alt={file.name}
                      radius="full"
                      className="aspect-square"
                    />
                  </div>
                ))}
              </ModalBody>
              <div className="flex flex-row gap-3 ml-5 mb-3">
                <Button
                  className="w-32"
                  onPress={imageUpload}
                  color="secondary"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" color="default" />
                    </>
                  ) : (
                    <>Update Image</>
                  )}
                </Button>
                <Button onPress={clear}>Discard</Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePicUpdate;
