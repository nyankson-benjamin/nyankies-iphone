import React from "react";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-16 shadow-sm">
      <div className="flex justify-between items-center h-full px-4">
        {children}
      </div>
    </div>
  );
}
