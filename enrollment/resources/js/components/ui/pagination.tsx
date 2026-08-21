interface PaginationProps {
    page: number;
    limit: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export function Pagination({ page, limit, totalPages, onPageChange, onLimitChange }: PaginationProps) {

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex justify-between items-center mt-10 text-gray-700">
            <div className="flex space-x-4">
                <select
                    value={limit}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className="py-1.5 px-3 border border-gray-400 text-gray-700 rounded-lg"
                >
                    <option value={5}>Rows 5</option>
                    <option value={10}>Rows 10</option>
                    <option value={20}>Rows 20</option>
                    <option value={50}>Rows 50</option>
                </select>
            </div>

            <div className="flex space-x-4">
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="py-1.5 px-3 border border-gray-400 rounded-lg text-gray-700"
                >
                    Previous 
                </button>

                <span className="flex items-center gap-1 text-gray-700 font-medium">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="py-1.5 px-3 border border-gray-400 rounded-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    )
}