"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Transition } from "@headlessui/react";

export const variants = cva(`text-sm h-4`, {
  variants: {
    paletteColor: {
      default: ``,
      error: `text-[#FF1E49]`,
      success: `text-[#38B487]`,
      warning: `text-[#F09243]`,
    },
  },
  defaultVariants: {
    paletteColor: "default",
  },
});

type HelperHintIcons = {
  [key in "error" | "warning" | "success"]: React.ReactElement;
};

export interface HintProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof variants> {
  icon?: React.JSX.Element | null;
}

const InputHelperHint = React.forwardRef<HTMLInputElement, HintProps>(
  ({ className, paletteColor, icon, children, ...props }, ref) => {    

    const show = !!children;

    return (
      <div className={cn(variants({ paletteColor, className }))} ref={ref} {...props}>
        <Transition
          show={show}
          as="p"
          className={"flex items-center gap-2"}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
           <span>{children}</span>
        </Transition>
      </div>
    );
  }
);
InputHelperHint.displayName = "InputHelperHint";

export default InputHelperHint;
