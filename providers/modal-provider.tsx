"use client";

import { AuthModal } from "@/components/modal/auth-modal";
import { UploadModal } from "@/components/modal/upload-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};
