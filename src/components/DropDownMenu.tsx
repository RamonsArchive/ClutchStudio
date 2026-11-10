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
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`flex flex-row items-center gap-2 px-4 py-2 rounded-full border duration-300 ease-in-out cursor-pointer ${
          isOpen
            ? "border-primary-500 bg-primary-500/15"
            : "border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30"
        }`}
        onClick={() => {
          // This will be handled by the parent component's click outside logic
        }}
      >
        <p className="font-funnel-sans font-medium text-[13px] md:text-[14px] text-white whitespace-nowrap">
          {title}
        </p>
        <ChevronDown
          className={`w-4 h-4 text-primary-300 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          ref={innerRef}
          className="absolute top-full left-0 mt-2 p-1 bg-primary-background-900 border border-white/15 rounded-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)] z-50 min-w-[200px] max-w-[calc(100vw-80px)] max-h-[300px] overflow-y-auto"
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-500/15 duration-200 ease-in-out cursor-pointer"
              onClick={() => updateFilters(option.value, option.title)}
            >
              <p className="font-funnel-sans font-normal text-[13px] md:text-[14px] text-slate-200">
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
