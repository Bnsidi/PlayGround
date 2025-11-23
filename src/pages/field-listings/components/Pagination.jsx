import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalResults, 
  resultsPerPage, 
  onPageChange 
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  if (totalPages <= 1) return null;

  return (
    <div className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Results Info */}
          <div className="text-sm text-muted-foreground">
            عرض {startResult} - {endResult} من أصل {totalResults} ملعب
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              iconName="ChevronRight"
              className="px-3"
            >
              السابق
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {getVisiblePages()?.map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-muted-foreground">...</span>
                  ) : (
                    <button
                      onClick={() => onPageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-micro ${
                        currentPage === page
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              iconName="ChevronLeft"
              className="px-3"
            >
              التالي
            </Button>
          </div>

          {/* Mobile Page Info */}
          <div className="sm:hidden text-sm text-muted-foreground">
            صفحة {currentPage} من {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;