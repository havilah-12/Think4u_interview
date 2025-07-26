import React from "react";

const Pagination = ({ page, total, limit, setPage, setLimit }) => {
  const totalPages = Math.ceil(total / limit);

  const handlePageInput = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= totalPages) {
      setPage(value);
    }
  };

  const handleLimitChange = (e) => {
    setPage(1); // reset to first page
    setLimit(Number(e.target.value));
  };

  return (
    <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
      <div className="text-sm text-gray-700">
        Page {page} of {totalPages}
      </div>
<div className="flex items-center gap-2">
  <button
    onClick={() => setPage((p) => p - 1)}
    disabled={page <= 1}
    className="rounded-md border border-gray-300 py-1.5 px-4 text-sm font-medium shadow hover:bg-black hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
  >
    Prev
  </button>

  <input
    type="number"
    value={page}
    onChange={handlePageInput}
    className="w-16 border border-gray-300 rounded-md px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-black transition"
    min={1}
    max={totalPages}
  />

  <button
    onClick={() => setPage((p) => p + 1)}
    disabled={page >= totalPages}
    className="rounded-md border border-gray-300 py-1.5 px-4 text-sm font-medium shadow hover:bg-black hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
  >
    Next
  </button>
</div>


    </div>
  );
};

export default Pagination;
