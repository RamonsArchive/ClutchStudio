import React from "react";
import { X } from "lucide-react";
import DropDownMenu from "./DropDownMenu";

interface FilterOption {
  value: string;
  title: string;
}

interface Props {
  titles: string[];
  selectedFilters: FilterOption[][]; // Array of filter arrays
  options: FilterOption[][]; // Array of option arrays
  updateFilters: (value: string, title: string, filterIndex: number) => void; // Added filterIndex
  isOpen: boolean[]; // Should be array of booleans for each dropdown
  outerRef: React.RefObject<HTMLDivElement | null>[];
  innerRef: React.RefObject<HTMLDivElement | null>[];
  resetFilters: () => void;
}

const AdminFilters = ({
  titles,
  selectedFilters,
  options,
  updateFilters,
  isOpen,
  outerRef,
  innerRef,
  resetFilters,
}: Props) => {
  return (
    <div className="flex flex-col gap-5 p-5 bg-secondary-800/50 rounded-xl">
      <div className="flex flex-row gap-2 items-center">
        <p className="font-montserrat font-normal text-[14px] sm:text-[16px] md:text-[20px] text-white">
          Filters
        </p>
      </div>

      {/* Dropdown Menus */}
      <div className="flex flex-row gap-2 xs:gap-5">
        <div className="flex flex-row gap-2 items-center">
          {titles.map((title, index) => (
            <DropDownMenu
              key={`${title}-${index}`}
              title={title}
              outerRef={outerRef[index]}
              innerRef={innerRef[index]}
              updateFilters={(value: string, title: string) =>
                updateFilters(value, title, index)
              }
              options={options[index] || []}
              isOpen={isOpen[index] || false}
            />
          ))}
        </div>
      </div>

      {/* Reset Filters Button */}
      {selectedFilters.some((filterArray) => filterArray.length > 0) && (
        <button
          onClick={resetFilters}
          className="flex flex-row flex-center px-3 py-2 bg-secondary-400/60 hover:bg-slate-300/80 duration-300 rounded-sm ease-in-out cursor-pointer w-fit"
        >
          <p className="font-montserrat font-normal text-[10px] sm:text-[12px] md:text-[14px] text-white">
            Reset Filters
          </p>
        </button>
      )}

      {/* Selected Filters Display */}
      {selectedFilters.some((filterArray) => filterArray.length > 0) && (
        <div className="flex flex-col gap-3">
          {selectedFilters.map(
            (filterArray, filterIndex) =>
              filterArray.length > 0 && (
                <div
                  key={`filter-group-${filterIndex}`}
                  className="flex flex-col gap-2"
                >
                  <p className="font-montserrat font-normal text-[12px] sm:text-[14px] text-slate-300">
                    {titles[filterIndex]}:
                  </p>
                  <div className="flex flex-row gap-2 xs:gap-5 rounded-xl overflow-x-auto scrollbar-hide w-full">
                    {filterArray.map((filter) => (
                      <button
                        key={`${filterIndex}-${filter.value}`}
                        className="flex flex-row justify-between gap-3 items-center font-montserrat font-normal text-[10px] sm:text-[12px] md:text-[14px] text-white bg-secondary-600/60 hover:bg-secondary-500/80 rounded-xl px-3 py-2 md:px-5 md:py-3 duration-300 ease-in-out cursor-pointer whitespace-nowrap"
                        onClick={() => {
                          updateFilters(
                            filter.value.toString(),
                            filter.title,
                            filterIndex
                          );
                        }}
                      >
                        {filter.title}
                        <span className="flex flex-row items-center text-white z-5">
                          <X className="w-4 h-4 xl:w-5 xl:h-5 hover:text-gray-400 duration-300 ease-in-out z-10" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default AdminFilters;
