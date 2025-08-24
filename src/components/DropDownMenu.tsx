import React from "react";
import { ChevronDown } from "lucide-react";

interface FilterOption {
  value: string;
  title: string;
}

interface Props {
  title: string;
  outerRef: React.RefObject<HTMLDivElement | null>;
  innerRef: React.RefObject<HTMLDivElement | null>;
  updateFilters: (value: string, title: string) => void;
  options: FilterOption[];
  isOpen: boolean;
}

const DropDownMenu = ({
  title,
  outerRef,
  innerRef,
  updateFilters,
  options,
  isOpen,
}: Props) => {
  return (
    <div className="relative" ref={outerRef}>
      <button
        className="flex flex-row items-center gap-2 px-3 py-2 bg-secondary-600/60 hover:bg-secondary-500/80 duration-300 rounded-sm ease-in-out cursor-pointer"
        onClick={() => {
          // This will be handled by the parent component's click outside logic
        }}
      >
        <p className="font-montserrat font-normal text-[10px] sm:text-[12px] md:text-[14px] text-white">
          {title}
        </p>
        <ChevronDown className="w-4 h-4 text-white" />
      </button>

      {isOpen && (
        <div
          ref={innerRef}
          className="absolute top-full left-0 mt-1 bg-secondary-800 border border-secondary-600 rounded-sm shadow-lg z-50 min-w-[200px] max-h-[300px] overflow-y-auto"
        >
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-3 py-2 hover:bg-secondary-700 duration-200 ease-in-out cursor-pointer"
              onClick={() => updateFilters(option.value, option.title)}
            >
              <p className="font-montserrat font-normal text-[10px] sm:text-[12px] md:text-[14px] text-white">
                {option.title}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
