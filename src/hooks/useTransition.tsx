import { createContext, ReactNode, useContext, useState, useCallback } from 'react';

interface TransitionContextProps {
  startTransition: (callback: () => void) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextProps>({
  startTransition: () => {},
  isTransitioning: false,
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback((callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      console.log("Testing");
      setIsTransitioning(false);
    }, 900); // Match the timeout duration to the animation duration
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
};
