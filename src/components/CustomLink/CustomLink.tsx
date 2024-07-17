import { ReactNode, MouseEvent, HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import { useTransition } from '@/hooks/useTransition';
import { cn } from '@/utils/cn';

interface CustomLinkProps extends LinkProps, HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

const CustomLink = ({ children, href, className, ...props }: CustomLinkProps) => {
  const router = useRouter();
  const { startTransition } = useTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(() => {
      router.push(`${href}`);
    });
  };

  return (
    <a href={href as string}  className={cn(className)} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default CustomLink;
