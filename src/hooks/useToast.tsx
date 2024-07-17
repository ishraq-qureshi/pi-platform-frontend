"use client";

import { type FC, type ReactNode, createContext, useRef, useState, useContext } from "react";
import Toast, { type ToastRef } from "@/components/Layout/Toast/Toast";
import { isArray } from "lodash";

type ToastVariant = "positive" | "destructive";

interface ToastHookProps {
  variant: ToastVariant;
  message: string | string[];
}
interface ToastContextType {
  toast: (options: ToastHookProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string | string[] | null>(null);
  const [toastVariant, setToastVariant] = useState<ToastVariant>();

  const toastRef = useRef<NonNullable<ToastRef>>({
    publish: () => {},
  });

  const toast = (options: ToastHookProps) => {
    const messages = isArray(options.message) ? options.message : [options.message];
    messages.forEach((message) => {
      if (message) {
        setToastMessage(message);
        setToastVariant(options.variant);
        toastRef.current.publish();
      }
    });
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toast ref={toastRef} variant={toastVariant}>
        {toastMessage}
      </Toast>
    </ToastContext.Provider>
  );
};

export default function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
