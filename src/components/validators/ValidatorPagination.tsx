"use client";

interface ValidatorPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ValidatorPagination = ({ currentPage, totalPages, onPageChange }: ValidatorPaginationProps) => {
  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-white">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Next
      </button>
    </div>
  );
}; 