import React from 'react'
import { UIProvider } from '../context/UIContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      {children}
    </UIProvider>
  );
}
