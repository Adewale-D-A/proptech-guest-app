/** @format */
import React from "react";
import { Search } from "lucide-react";
import { Input } from "../_shared/input";

interface SearchInputProps {
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <Input
        className={`border-[#EDEFF3] pl-10 text-xs text-[#52575C] w-full shadow-none border bg-[#fcfcfd] ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="absolute top-[9px] left-[15px]">
        <Search size={18} color="#52575C" />
      </div>
    </div>
  );
};

export default SearchInput;
