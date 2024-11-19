import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
   
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination flex justify-center items-center space-x-2 mt-12">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
                Previous
            </button>
            {[...Array(totalPages).keys()].map(page => (
                <button
                    key={page + 1}
                    onClick={() => handlePageChange(page + 1)}
                    className={`px-4 py-2 border rounded-lg ${
                        page + 1 === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {page + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
