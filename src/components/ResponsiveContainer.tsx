import React from "react";

export default function ResponsiveContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="hidden md:block lg:block xl:block">{children}</div>;
}
