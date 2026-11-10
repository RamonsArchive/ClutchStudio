import React from "react";
import { X, SlidersHorizontal } from "lucide-react";
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
  const hasSelectedFilters = selectedFilters.some(
    (filterArray) => filterArray.length > 0
  );

  return (
    // z-20 keeps the open dropdowns above the ticket cards below
    <div className="panel relative z-20 flex flex-col gap-4 md:gap-5 p-4 md:p-5">
      <div className="flex flex-row flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <SlidersHorizontal className="w-4 h-4 text-primary-400" aria-hidden />
          <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-primary-400">
            Filters
          </p>
        </div>

        {/* Reset Filters Button */}
        {hasSelectedFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex flex-row flex-center px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 duration-300 ease-in-out cursor-pointer w-fit"
          >
            <p className="font-mono text-[11px] md:text-[12px] text-slate-200">
              Reset Filters
            </p>
          </button>
        )}
      </div>

      {/* Dropdown Menus */}
      <div className="flex flex-row flex-wrap gap-2 xs:gap-3 items-center">
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

      {/* Selected Filters Display */}
      {hasSelectedFilters && (
        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
          {selectedFilters.map(
            (filterArray, filterIndex) =>
              filterArray.length > 0 && (
                <div
                  key={`filter-group-${filterIndex}`}
                  className="flex flex-col gap-2"
                >
                  <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-slate-400">
                    {titles[filterIndex]}:
                  </p>
                  <div className="flex flex-row flex-wrap gap-2 w-full">
                    {filterArray.map((filter) => (
                      <button
                        type="button"
                        key={`${filterIndex}-${filter.value}`}
                        aria-label={`Remove filter ${filter.title}`}
                        className="group flex flex-row justify-between gap-2 items-center font-mono text-[11px] md:text-[12px] text-primary-100 border border-primary-500/40 bg-primary-500/10 hover:bg-primary-500/20 hover:border-primary-400 rounded-full pl-3 pr-2 py-1.5 duration-300 ease-in-out cursor-pointer whitespace-nowrap"
                        onClick={() => {
                          updateFilters(
                            filter.value.toString(),
                            filter.title,
                            filterIndex
                          );
                        }}
                      >
                        {filter.title}
                        <span className="flex flex-row items-center">
                          <X
                            className="w-3.5 h-3.5 text-primary-300 group-hover:text-white duration-300 ease-in-out"
                            aria-hidden
                          />
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
