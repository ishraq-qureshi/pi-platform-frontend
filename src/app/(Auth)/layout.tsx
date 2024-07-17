"use client"

import ProtectedRoute from "@/components/Auth/ProtectedRoutes/ProtectedRoutes";
import PageLoader from "@/components/PageLoader/PageLoader";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {    
    if (token) {
      router.push('/dashboard');
    }
  }, [token, router]);
  
  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  return (
    <>
      {isLoading && <PageLoader isLoading={isLoading}/>}
      {!isLoading && !token ? (
        children
      ) : null}
    </>
  )
  
};