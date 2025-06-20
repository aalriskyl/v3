import clsx from 'clsx';
import { KTIcon } from '../../../../../helpers';
import { useMemo } from 'react';

interface ListPaginationProps {
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const ListPagination = ({ total, currentPage, pageSize, onPageChange }: ListPaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  const generatePageNumbers = () => {
    const pages = new Set<number>();

    // Always include first and last pages
    pages.add(1);
    pages.add(totalPages);

    // Add window around current page
    const windowStart = Math.max(1, currentPage - 2);
    const windowEnd = Math.min(totalPages, currentPage + 2);
    for (let i = windowStart; i <= windowEnd; i++) {
      pages.add(i);
    }

    // Sort pages and add ellipsis where needed
    const sortedPages = Array.from(pages).sort((a, b) => a - b);
    const withEllipsis: (number | string)[] = [];

    sortedPages.forEach((page, index) => {
      if (index > 0 && page - sortedPages[index - 1] > 1) {
        withEllipsis.push('...');
      }
      withEllipsis.push(page);
    });

    return withEllipsis;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <div className='row mt-8'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
        <span className="text-muted">
          Menampilkan data {startItem} sampai {endItem} dari {total} data
        </span>
      </div>

      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            <li className={clsx('page-item', { disabled: currentPage === 1 })}>
              <a
                className='page-link'
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ cursor: 'pointer' }}
              >
                &lt;
              </a>
            </li>

            {generatePageNumbers().map((page, index) => {
              if (typeof page === 'string') {
                return (
                  <li key={`ellipsis-${index}`} className='page-item disabled'>
                    <span className='page-link'>...</span>
                  </li>
                );
              }
              return (
                <li
                  key={page}
                  className={clsx('page-item', { active: page === currentPage })}
                >
                  <a
                    className='page-link'
                    onClick={() => handlePageChange(page)}
                    style={{ cursor: 'pointer' }}
                  >
                    {page}
                  </a>
                </li>
              );
            })}

            <li className={clsx('page-item', { disabled: currentPage === totalPages })}>
              <a
                className='page-link'
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ cursor: 'pointer' }}
              >
                &gt;
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { ListPagination };