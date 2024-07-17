"use client"

import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import PageLoader from '@/components/PageLoader/PageLoader';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  return (
    <>
      {isLoading && <PageLoader isLoading={isLoading}/>}
      {!isLoading && token ? (
        children
      ) : null}
    </>
  )
};

export default ProtectedRoute;
