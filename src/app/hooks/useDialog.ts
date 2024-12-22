import { create } from "zustand";

interface DialogProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: any;
    setData: (data: any) => void;
}

export const useDialog = create<DialogProps>((set: any) => ({
    isOpen: false,
    onOpen: () => set((state: any) => ({ ...state, isOpen: true })),
    onClose: () => set((state: any) => ({ ...state, isOpen: false })),
    data: null,
    setData: (data: any) => set((state: any) => ({ ...state, data }))
}));