"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Search, User } from "lucide-react";

const BottomBar = () => {
  return (
    <div
      id="bottom-bar"
      className="w-screen bg-slate-100 dark:bg-black h-[7vh] fixed bottom-0 flex justify-center text-zinc-900 dark:text-white z-10"
    >
      <div className="flex w-[100%] md:w-[80%] lg:w-[70%] justify-between">
        <MenuItem href="/">
          <House height={17} />
          <span>Homepage</span>
        </MenuItem>

        <MenuItem href="/search">
          <Search height={17} />
          <span>Search</span>
        </MenuItem>

        <MenuItem href="/login">
          <User height={17} />
          <span>Profile</span>
        </MenuItem>
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
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`w-1/3 flex items-center border-t-2 flex-col text-sm ${
        pathname === href
          ? "border-black dark:border-white"
          : "border-gray-500/15"
      } justify-center hover:border-black hover:dark:border-white duration-100`}
    >
      {children}
    </Link>
  );
};
