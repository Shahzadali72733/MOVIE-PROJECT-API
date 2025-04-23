import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, onNext, onPrevious }) => {
  const renderPageNumbers = () => {
    const visiblePages = [];
    const pageRange = 3; 

    let startPage = Math.max(1, currentPage - pageRange);
    let endPage = Math.min(totalPages, currentPage + pageRange);

    if (startPage > 1) visiblePages.push('...');

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (endPage < totalPages) visiblePages.push('...');

    return visiblePages.map((page, index) => (
      page === '...' ? (
        <span key={index} className="pagination-ellipsis">...</span>
      ) : (
        <button
          key={index}
          className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      )
    ));
  };

  return (
    <div className="pagination-container">
      <button
        className="btn btn-primary"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      {renderPageNumbers()}

      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
