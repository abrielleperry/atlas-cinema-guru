"use client";

import React from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  handlePrevious: () => void;
  handleNext: () => void;
};

const PaginationButtons = ({
  page,
  totalPages,
  handlePrevious,
  handleNext,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center  p-4 ">
      <div className="flex overflow-hidden rounded-full">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="bg-atlasTeal text-[#000033] font-medium py-4 px-4 hover:bg-[#1AB1A7] transition rounded-l-full border-r border-[#000033]"
        >
          Previous
        </button>
        <div className="px-2"></div>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="bg-atlasTeal text-[#000033] font-medium py-4 px-7 hover:bg-[#1AB1A7] transition rounded-r-full"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationButtons;
