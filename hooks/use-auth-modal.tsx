import { create } from "zustand";

interface UseAuthModalProps {
  isOpen: boolean;
  isSignIn: boolean;
  changeMode: (mode: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const UseAuthModal = create<UseAuthModalProps>((set) => ({
  isOpen: false,
  isSignIn: false,
  changeMode: (mode: boolean) => set({ isSignIn: mode }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
