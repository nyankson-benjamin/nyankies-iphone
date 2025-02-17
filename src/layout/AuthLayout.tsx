import React from "react";

export default function AuthLayout({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex mt-10">
      <div className="flex items-start justify-between container rounded-lg my-auto mx-auto w-[90%] md:w-1/2 lg:w-1/2 xl:w-1/2 shadow-md">
        {/* <aside className="w-full sm:hidden md:hidden lg:block xl:block">
          side bar
        </aside> */}
        <div className="flex flex-col gap-2 w-full items-center border-t-4 border-primary rounded-lg p-5 bg-white">
        <h1 className="text-2xl font-bold text-primary uppercase">{text}</h1>
        {children}
        </div>
      </div>
    </div>
  );
}
