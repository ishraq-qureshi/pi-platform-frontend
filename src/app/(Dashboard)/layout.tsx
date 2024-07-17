"use client"

import ProtectedRoute from "@/components/Auth/ProtectedRoutes/ProtectedRoutes";
import Header from "@/components/Page/Header/Header";
import Sidebar from "@/components/Page/Sidebar/Sidebar";
import Transition from "@/components/Transition/Transition";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex bg-antiqueWhite min-h-[100vh]">
        <Sidebar />
        <div className="px-8 ml-[250px] flex-1">
          <Header />
          <div className="py-8">
            <Transition>
              {children}
            </Transition>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};