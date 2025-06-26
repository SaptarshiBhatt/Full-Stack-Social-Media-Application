import { deletePost } from "@/utils/apiQueries";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import React from "react";
import { toast } from "sonner";

const DeletePostButton = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setloading] = useState(false);

  const queryClient = useQueryClient();

  const dltFn = async () => {
    setloading(true);
    const info = await deletePost(id);

    if (info === undefined) {
      toast.error("Error");
    }
    if (info !== undefined) {
      setloading(false);
      toast.success("ok");
      queryClient.refetchQueries({ queryKey: ["getMePost"] });
      onOpenChange();
    }
  };

  return (
    <>
      <Button fullWidth color="secondary" onPress={onOpen} variant="solid">
        DeletePost
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onclose) => (
            <>
              <ModalHeader>Are You Sure ?</ModalHeader>
              <ModalBody>This action cannot be undone</ModalBody>
              <ModalFooter>
                <div className="flex justify-end items-center gap-2">
                  <Button onPress={dltFn} isLoading={loading} color="danger">
                    Delete
                  </Button>
                  <Button>Cancel</Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeletePostButton;
