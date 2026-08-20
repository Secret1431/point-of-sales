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
            <div className="flex items-center">
                <select
                    value={limit}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                >
                    <option value={5}>Rows 5</option>
                    <option value={10}>Rows 10</option>
                    <option value={20}>Rows 20</option>
                    <option value={50}>Rows 50</option>
                </select>
            </div>

            <div className="flex items-center">
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="bg-red-500 py-2 px-4 shadow-sm rounded"
                >
                    Previous 
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="bg-green-500 py-2 px-4 shadow-sm rounded"
                >
                    Next
                </button>
            </div>
        </div>
    )
}