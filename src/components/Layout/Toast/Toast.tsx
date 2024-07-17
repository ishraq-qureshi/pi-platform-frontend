"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { type ToastProps as ToastPrimitiveProps } from "@radix-ui/react-toast";
import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./styles.module.css";
import CloseIcon from "@/assets/general/Close-Icon.svg";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import tw from "tailwind-styled-components";

export const toastVariants = cva(
  `
    flex justify-between items-center
    h-16 p-4 
    bg-white 
    rounded-r-md
    border-t border-r border-b border-l-4 border-gray-300
    shadow-md 
  `,
  {
    variants: {
      variant: {
        positive: `
        border-l-green-600
      `,
        destructive: `
        border-l-rose-600
      `,
      },
    },
    defaultVariants: {
      variant: "positive",
    },
  }
);

export interface ToastProps
  extends ToastPrimitiveProps,
    VariantProps<typeof toastVariants> {}

export interface ToastRef {
  publish: () => void;
}

export interface ToastState {
  variant: "positive" | "destructive";
  message: string;
}

/**
 * Toast built on top of Radix UI's Toast component with a variant prop added.
 *
 * The Provider and Viewport components are in the root layout.tsx file.
 *
 * @see https://www.radix-ui.com/docs/primitives/components/toast
 *
 * @example
 * function App() {
 *   const toastRef = useRef<NonNullable<ToastRef>>({
 *     publish: () => {
 *       // placeholder
 *     },
 *   });
 *
 *   const showToast = () => {
 *     toastRef.current.publish();
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={showToast}>Show Toast</button>
 *       <Toast ref={toastRef} variant="success">This is a success toast!</Toast>
 *     </div>
 *   );
 * }
 */
const Toast = forwardRef<ToastRef, ToastProps>(
  ({ children, className, variant, ...toastProps }, ref) => {
    const [count, setCount] = useState(0);

    useImperativeHandle(ref, () => ({
      publish: () => setCount((count) => count + 1),
    }));

    return (
      <>
        
          {Array.from({ length: count }).map((_, index) => (
            <ToastPrimitive.Root
              className={cn(
                styles.ToastRoot,
                toastVariants({ variant, className })
              )}
              key={index}
              {...toastProps}
            >
              <ToastPrimitive.Description>
                {children}
              </ToastPrimitive.Description>
              <ToastPrimitive.Close>
                <CloseIcon />
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          ))}
        
      </>
    );
  }
);

Toast.displayName = "Toast";

export const StyledToastViewport = tw(ToastPrimitive.Viewport)`
  fixed top-0 right-0
  flex flex-col gap-y-4
  w-[30rem] max-w-full
  p-8 m-0
  list-none z-[99] outline-none
`;

export default Toast;
