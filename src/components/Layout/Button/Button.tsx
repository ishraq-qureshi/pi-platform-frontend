"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import tw from "tailwind-styled-components";
import LoadingCircle from "@/assets/loaders/loading-circle.svg";

export const buttonVariants = cva(
  `
    flex justify-center items-center gap-4 
    text-sm font-semibold leading-tight relative overflow-hidden
    data-[isloading=true]:text-opacity-0
    select-none data-[isloading=true]:pointer-events-none    
    data-[isloading=true]:bg-opacity-70
    transition-colors text-opacity-100
    data-[isloading=true]:border-opacity-50
    border-opacity-100
    duration-300
    bg-opacity-100
  `,
  {
    variants: {
      size: {
        default: `px-6 py-3`,
        small: `
          px-3 py-2
          font-medium leading-none
        `,
      },
      variant: {        
        dark: `
          rounded 
          bg-amaranthPurple disabled:bg-black
          text-antiqueWhite disabled:text-white
          [&>span>svg]:stroke-[#ffffff]
          border border-transparent
      `,
        light: `
          rounded 
          bg-antiqueWhite hover:antiqueWhite active:bg-antiqueWhite disabled:bg-[#E7E8E9]
          text-amaranthPurple hover:text-amaranthPurple disabled:text-black
          border border-transparent
      `,
        outline: `
          rounded border border-amaranthPurple 
          hover:bg-amaranthPurple disabled:bg-black
          text-amaranthPurple hover:text-antiqueWhite disabled:text-white
          hover:border-amaranthPurple disabled:border-black
      `,
        text: `
          gap-2.5 px-0 py-0 
          text-neutral-900 active:font-bold disabled:text-[#8D9298]
          border-b border-transparent border-dotted
          hover:border-black/[.2] active:border-black/[.6]
          [&>span>svg]:w-4 [&>span>svg]:h-4
      `,
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    const Loader = tw.span`
      px-0 py-0 w-full h-full
      absolute left-0 top-0
      flex justify-center items-center
      transition-all
      duration-700 delay-75
      group:opacity-100
    `;

    return (
      <button
        data-isloading={isLoading ? isLoading : false}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {isLoading && (
          <Loader>
            <LoadingCircle className="w-6 h-6" />
          </Loader>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
