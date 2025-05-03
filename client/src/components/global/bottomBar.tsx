"use client";

import Link from "next/link";
import { Button } from "../ui/button";

const BottomBar = () => {
  return (
    <div className="w-screen  bg-black h-[6vh] absolute bottom-0 flex justify-center text-white z-10">
      <div className="w-64 flex items-center border-t-2 border-white justify-center">
        <MenuItem href="/">Home</MenuItem>
      </div>
      <div className="w-64 flex items-center border-t-2 border-white justify-center">
        <MenuItem href="/search">Search</MenuItem>
      </div>
      <div className="w-64 flex items-center border-t-2 border-white justify-center">
        <MenuItem href="/">Home</MenuItem>
      </div>
    </div>
  );
};
export default BottomBar;

const MenuItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-white w-full text-center"
    >
      {children}
    </Link>
  );
};
