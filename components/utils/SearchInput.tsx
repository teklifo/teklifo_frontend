"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Search } from "lucide-react";
import useDebounce from "@/utils/hooks/useDebounce";

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router, pathname]);

  return (
    <div className="relative flex items-center">
      <Search className="absolute mx-3 text-zinc-500" />
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        className={`      
          w-full
          p-4
          pl-12
          font-light 
          bg-zinc-100
          rounded-2xl
          outline-none
          dark:bg-zinc-800
        `}
      />
    </div>
  );
};

export default SearchInput;
