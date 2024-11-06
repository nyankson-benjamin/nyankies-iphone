import React from "react";
import { UIProvider } from "../context/UIContext";
import { AlertProvider } from "../context/AlertContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <AlertProvider>{children}</AlertProvider>
    </UIProvider>
  );
}
