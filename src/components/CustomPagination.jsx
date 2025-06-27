import { Pagination } from 'react-bootstrap'
import '../css/CustomPagination.css'

export function CustomPagination ({ currentPage, totalPages, onPageChange }) {
  return (
    <div className='pagination-wrapper'>
      <Pagination className='custom-pagination flex-wrap justify-content-center'>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1
          return (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          )
        })}

        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        />
      </Pagination>
    </div>
  )
}
