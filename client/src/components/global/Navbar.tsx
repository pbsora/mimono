"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { FormEvent, useState } from "react";
import { ThemeToggle } from "../theme/ThemeToggle";

const Navbar = () => {
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get("query");
  const [searchQuery, setSearchQuery] = useState(
    query || ""
  );

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim().length === 0) {
      return;
    }
    router.push(
      `/search?query=${encodeURIComponent(
        searchQuery.trim()
      )}&page=1`
    );
  };

  return (
    <nav
      className="text-white flex w-screen min-h-[10vh] lg:min-h-[8vh] items-center justify-between border-b border-gray-500/25 pt-2 pb-3 px-5 lg:px-20 lg:py-0 bg-black flex-col gap-3
    lg:flex-row"
    >
      <div className="w-full lg:w-1/3">Logo</div>
      <form className="w-full lg:w-2/3" onSubmit={search}>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded border border-gray-300 bg-slate-900"
          name="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </form>
      <ThemeToggle />
    </nav>
  );
};
export default Navbar;
