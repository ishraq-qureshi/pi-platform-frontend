"use client";

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import "./page-transition.css";
import { useTransition } from "@/hooks/useTransition";

interface TransitionProps {
  children: ReactNode;
}

const Transition: FC<TransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const nodeRef = useRef(null);
  const { isTransitioning } = useTransition();
  const [currentChildren, setCurrentChildren] = useState<ReactNode>(children);

  useEffect(() => {
    if (!isTransitioning) {
      setCurrentChildren(children);
    }
  }, [pathname, isTransitioning, children]);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={`${pathname}_${isTransitioning}`}
        nodeRef={nodeRef}
        classNames="transition-screen"
        timeout={900}
        onExited={() => setCurrentChildren(children)}
        unmountOnExit
      >
        <div ref={nodeRef}>{currentChildren}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Transition;
