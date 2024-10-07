import { Image } from "@/types/types";
import { create } from "zustand";

interface useImageDetailProps {
  isOpen: boolean;
  selectedImage: Image | null;
  setSelectedImage: (data: Image | null) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useImageDetail = create<useImageDetailProps>((set) => ({
  isOpen: false,
  selectedImage: null,
  setSelectedImage: (data: Image | null) => set({ selectedImage: data }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
