"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { ProjectTemplate } from "@/types/GlobalTypes";
import ProjectDisplayCard from "./ProjectDisplayCard";
import { ProjectType } from "@/types/GlobalTypes";
import { ChevronDown, X, Filter } from "lucide-react";
import ProjectGrid from "./ProjectGrid";

const AllProjects = ({ projects }: { projects: ProjectTemplate[] }) => {
  const [selectedServiceType, setSelectedServiceType] = useState<string>("ALL");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropDownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Get unique service types from projects
  const serviceTypes = useMemo(() => {
    const types = projects.map((project) => project.projectType);
    return Array.from(new Set(types));
  }, []);

  // Filter projects based on selected service type
  const filteredProjects = useMemo(() => {
    if (selectedServiceType === "ALL") {
      return projects;
    }
    return projects.filter(
      (project) => project.projectType === selectedServiceType
    );
  }, [selectedServiceType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const dropDownTarget = dropdownRef.current?.contains(
        event.target as Node
      );
      const dropDownButtonTarget = dropDownButtonRef.current?.contains(
        event.target as Node
      );

      // If clicking outside both the dropdown and button, close it
      if (!dropDownTarget && !dropDownButtonTarget) {
        setIsDropdownOpen(false);
      }
      // If clicking the button, toggle it
      else if (dropDownButtonTarget && !dropDownTarget) {
        setIsDropdownOpen((prev) => !prev);
      }
      // If clicking inside dropdown, keep it open (don't toggle)
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Handle service type selection
  const handleServiceTypeSelect = (serviceType: string) => {
    setSelectedServiceType(serviceType);
    setIsDropdownOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedServiceType("ALL");
  };

  // Get display name for service type
  const getServiceTypeDisplayName = (serviceType: string) => {
    if (serviceType === "ALL") return "All Projects";
    switch (serviceType) {
      case ProjectType.WEB_DEVELOPMENT:
        return "Web Development";
      case ProjectType.DATA_SCIENCE:
        return "Data Science";
      case ProjectType.AI_SOLUTIONS:
        return "AI Solutions";
      case ProjectType.OTHER:
        return "Other";
      default:
        return "All Projects";
    }
  };

  // Check if any filters are active
  const hasActiveFilters = selectedServiceType !== "ALL";

  return (
    <div className="w-full h-full py-10 px-3 md:px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animated-gradient-text">
            {hasActiveFilters
              ? getServiceTypeDisplayName(selectedServiceType)
              : "All Projects"}
          </h1>
          <p className="text-lg sm:text-xl text-[#475569] max-w-3xl mx-auto">
            {hasActiveFilters
              ? `Explore my ${getServiceTypeDisplayName(
                  selectedServiceType
                ).toLowerCase()} projects and see how I solve real-world problems with innovative solutions.`
              : "Explore my portfolio of web development, data science, and AI solutions projects"}
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-8 bg-gradient-to-r from-[#F0F8FF] via-[#F5F7FA] to-[#F0F8FF] rounded-2xl border border-[#E2E8F0] shadow-sm">
            {/* Filter Label */}
            <div className="flex items-center gap-2 text-[#475569] font-medium">
              <Filter className="w-5 h-5 text-[#0060CD]" />
              <span>Filter by:</span>
            </div>

            {/* Service Type Dropdown */}
            <div className="relative">
              <button
                ref={dropDownButtonRef}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl shadow-sm hover:border-[#0060CD] hover:shadow-md transition-all duration-200 min-w-[200px] justify-between"
              >
                <span className="text-[#0F172A] font-medium">
                  {getServiceTypeDisplayName(selectedServiceType)}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#64748B] transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#E2E8F0] rounded-xl shadow-lg z-10 overflow-hidden"
                >
                  {/* All Projects Option */}

                  <button
                    onClick={() => handleServiceTypeSelect("ALL")}
                    className={`w-full px-6 py-3 text-left hover:bg-[#F0FDF4] transition-colors duration-150 ${
                      selectedServiceType === "ALL"
                        ? "bg-[#DCFCE7] text-[#008E1A] font-semibold"
                        : "text-[#475569]"
                    }`}
                  >
                    All Projects
                  </button>

                  {/* Service Type Options */}
                  {serviceTypes.map((serviceType) => (
                    <button
                      key={serviceType}
                      onClick={() => handleServiceTypeSelect(serviceType)}
                      className={`w-full px-6 py-3 text-left hover:bg-[#F0FDF4] transition-colors duration-150 ${
                        selectedServiceType === serviceType
                          ? "bg-[#DCFCE7] text-[#008E1A] font-semibold"
                          : "text-[#475569]"
                      }`}
                    >
                      {getServiceTypeDisplayName(serviceType)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-3 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] rounded-xl transition-colors duration-200 font-medium"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Active Filter Display */}
          {hasActiveFilters && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#DCFCE7] text-[#008E1A] rounded-full text-sm font-medium">
                <Filter className="w-4 h-4" />
                Showing {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "project" : "projects"} in{" "}
                {getServiceTypeDisplayName(selectedServiceType)}
              </span>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <ProjectGrid
          filteredProjects={filteredProjects}
          clearFilters={clearFilters}
        />

        {/* Results Summary */}
        <div className="mt-12 text-center text-gray-600">
          <p>
            {hasActiveFilters
              ? `Showing ${filteredProjects.length} of ${projects.length} total projects`
              : `Showing all ${projects.length} projects`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
