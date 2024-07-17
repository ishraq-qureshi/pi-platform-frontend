"use client";

import * as Popover from "@radix-ui/react-popover";
import tw from "tailwind-styled-components";
import Link from "next/link";
import { type FC, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface PopoverListItemLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const PopoverRoot = Popover.Root;
export const PopoverTrigger = Popover.Trigger;
export const PopoverAnchor = Popover.Anchor;
export const PopoverPortal = Popover.Portal;

export const PopoverContent = tw(Popover.Content)`
  p-2
  bg-white rounded shadow
  outline-none focus:outline-none 
  z-50
`;

export const PopoverClose = Popover.Close;
export const PopoverArrow = Popover.Arrow;

export const PopoverList = tw.ul``;

export const PopoverListItem = tw.li``;

export const PopoverMenuItem = tw.div`
  flex items-center justify-start gap-3
  pl-3 pr-5 py-1.5 
  bg-white hover:bg-[#ff1f4a0f]
  rounded-sm
  cursor-pointer
  text-zinc-700 text-xs font-medium
`;

export const PopoverListItemLink: FC<PopoverListItemLinkProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <Popover.Close asChild>
      <Link
        href={href}
        className={cn(
          "flex items-center justify-start gap-3 pl-3 pr-5 py-1.5 bg-white hover:bg-amaranthPurple text-amaranthPurple hover:text-antiqueWhite group rounded-sm cursor-pointer",
          className
        )}
      >
        {children}
      </Link>
    </Popover.Close>
  );
};
