import React from "react";


type JobPaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function JobPagination({
                                          currentPage,
                                          totalPages,
                                          onPageChange,
                                      }: JobPaginationProps): React.JSX.Element {

    if (totalPages <= 0) return <></>;
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    return (
        <div className="mt-10 flex items-center justify-center gap-2">
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`flex h-10 w-10 items-center justify-center border text-sm ${
                    currentPage === 1
                        ? "cursor-not-allowed border-gray-200 text-gray-300"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
            >
                ‹
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`flex h-10 w-10 items-center justify-center border text-sm font-medium transition ${
                        currentPage === page
                            ? "border-gray-400 bg-gray-100 text-gray-900"
                            : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`flex h-10 w-10 items-center justify-center border text-sm ${
                    currentPage === totalPages
                        ? "cursor-not-allowed border-gray-200 text-gray-300"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
            >
                ›
            </button>
        </div>
    );
}