import React, { useState } from 'react';

const svgPaths = {
  // Single chevron right
  chevronRight: "M0.6 8.93333L4.76667 4.76667L0.6 0.6",
  // Double chevron right (two arrows)
  doubleChevronRight1: "M6.43594 8.93333L10.6026 4.76667L6.43594 0.6",
  doubleChevronRight2: "M0.6 8.93333L4.76667 4.76667L0.6 0.600001",
};

// Single chevron SVG (right-facing)
const ChevronRightIcon = () => (
  <svg width="5" height="10" viewBox="0 0 5.367 9.533" fill="none">
    <path d={svgPaths.chevronRight} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
  </svg>
);

// Double chevron SVG (right-facing)
const DoubleChevronRightIcon = () => (
  <svg width="11" height="10" viewBox="0 0 11.203 9.533" fill="none">
    <path d={svgPaths.doubleChevronRight1} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
    <path d={svgPaths.doubleChevronRight2} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
  </svg>
);

// Dropdown caret
const DropdownCaret = () => (
  <svg width="5" height="10" viewBox="0 0 5.367 9.736" fill="none" className="rotate-90">
    <path d="M0.6 9.13545L4.76667 4.86772L0.6 0.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
  </svg>
);

interface TablePaginationProps {
  totalItems: number;
  currentPage?: number;
  itemsPerPage?: number;
  itemLabel?: string;
}

export const TablePagination = ({
  totalItems,
  currentPage: initialPage = 1,
  itemsPerPage: initialPerPage = 5,
  itemLabel = 'items',
}: TablePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Calculate visible page numbers (max 5)
  const getVisiblePages = () => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const perPageOptions = [5, 10, 20, 50];

  return (
    <div className="px-6 py-4 flex items-center justify-between text-[#9caab8] font-['Inter:Regular',sans-serif] text-[14px] leading-[18.2px]">
      {/* Left: Item count */}
      <p>{startItem}-{String(endItem).padStart(2, '0')} of {totalItems} {itemLabel}</p>

      {/* Center: Page navigation */}
      <div className="flex items-center gap-[8px]">
        {/* First page (double left) */}
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-[28px] h-[28px] border border-[#9caab8] rounded-[6px] text-[#9caab8] hover:text-[#f8f9fa] hover:border-[#f8f9fa] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rotate-180"
        >
          <DoubleChevronRightIcon />
        </button>

        {/* Previous page (single left) */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-[28px] h-[28px] border border-[#9caab8] rounded-[6px] text-[#9caab8] hover:text-[#f8f9fa] hover:border-[#f8f9fa] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rotate-180"
        >
          <ChevronRightIcon />
        </button>

        {/* Page numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`flex items-center justify-center w-[28px] h-[28px] rounded-[6px] transition-colors text-[14px] leading-[18.2px] font-['Inter:Regular',sans-serif] ${
              page === currentPage
                ? 'border border-[#feff1c] text-[#9caab8]'
                : 'text-[#9caab8] hover:text-[#f8f9fa]'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next page (single right) */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-[28px] h-[28px] border border-[#9caab8] rounded-[6px] text-[#9caab8] hover:text-[#f8f9fa] hover:border-[#f8f9fa] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRightIcon />
        </button>

        {/* Last page (double right) */}
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-[28px] h-[28px] border border-[#9caab8] rounded-[6px] text-[#9caab8] hover:text-[#f8f9fa] hover:border-[#f8f9fa] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <DoubleChevronRightIcon />
        </button>
      </div>

      {/* Right: Items per page */}
      <div className="flex items-center gap-[8px]">
        <div className="relative">
          <button
            onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
            className="flex items-center justify-center gap-[6px] min-w-[50px] h-[28px] px-[10px] border border-[#9caab8] rounded-[6px] text-[#9caab8] hover:text-[#f8f9fa] hover:border-[#f8f9fa] transition-colors text-[14px] leading-[18.2px] font-['Inter:Regular',sans-serif]"
          >
            <span>{itemsPerPage}</span>
            <DropdownCaret />
          </button>
          {showPerPageDropdown && (
            <div className="absolute bottom-full mb-1 left-0 min-w-[50px] bg-[#232326] border border-[#424249] rounded-[6px] overflow-hidden z-10 shadow-lg">
              {perPageOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setItemsPerPage(opt);
                    setCurrentPage(1);
                    setShowPerPageDropdown(false);
                  }}
                  className={`block w-full px-3 py-1.5 text-[14px] text-left transition-colors font-['Inter:Regular',sans-serif] ${
                    opt === itemsPerPage ? 'text-[#feff1c] bg-[#121214]' : 'text-[#9caab8] hover:text-[#f8f9fa] hover:bg-[#121214]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-[#9caab8] text-[14px] leading-[18.2px] font-['Inter:Regular',sans-serif] uppercase tracking-wide">Items per Page</span>
      </div>
    </div>
  );
};
