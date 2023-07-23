"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

const CloseModal: React.FC = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant="secondary"
      className="h-6 w-6 p-0 rounded-md"
      aria-label="close modal"
    >
      <Cross1Icon className="h-4 w-4" />
    </Button>
  );
};

export default CloseModal;
