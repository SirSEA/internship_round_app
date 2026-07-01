export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-green-700 hover:bg-green-100 cursor-pointer"
      >
        ← Prev
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-8 h-8 rounded-lg text-sm font-medium transition-colors text-green-700 hover:bg-green-100 cursor-pointer"
          >
            1
          </button>
          {start > 2 && <span className="text-green-400 text-sm">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            p === page
              ? "bg-green-800 text-cream-50"
              : "text-green-700 hover:bg-green-100"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-green-400 text-sm">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-8 h-8 rounded-lg text-sm font-medium transition-colors text-green-700 hover:bg-green-100 cursor-pointer"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-green-700 hover:bg-green-100 cursor-pointer"
      >
        Next →
      </button>
    </div>
  );
}
