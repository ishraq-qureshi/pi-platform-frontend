"use client"

import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import TokenLoader from "@/components/Auth/TokenLoader/TokenLoader";
import { ToastProvider } from "@/hooks/useToast";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { StyledToastViewport } from "@/components/Layout/Toast/Toast";
import { TransitionProvider } from "@/hooks/useTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <TokenLoader>
          <html>
            <body>
              <ToastPrimitive.Provider swipeDirection="right" duration={2000}>
                <ToastProvider>
                  <TransitionProvider>
                    {children}
                  </TransitionProvider>
                  <StyledToastViewport />
                </ToastProvider>
              </ToastPrimitive.Provider>
              </body>
          </html>
      </TokenLoader>
    </Provider>
  );
}
