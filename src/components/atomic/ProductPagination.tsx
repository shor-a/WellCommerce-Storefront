import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface ProductPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const ProductPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) => {
  if (totalPages <= 1) return null

  const window = 3
  const showEllipsis = totalPages > window * 2

  const startPages = Array.from(
    { length: showEllipsis ? window : totalPages },
    (_, i) => i + 1
  )
  const endPages = showEllipsis
    ? Array.from({ length: window }, (_, i) => totalPages - window + 1 + i)
    : []

  const pageLink = (page: number) => (
    <PaginationItem key={page}>
      <PaginationLink
        href="#"
        isActive={page === currentPage}
        className={
          page === currentPage
            ? "rounded-[7px] border-transparent bg-secondary text-foreground hover:bg-secondary"
            : "rounded-[7px] border-transparent"
        }
        onClick={(e) => {
          e.preventDefault()
          onPageChange(page)
        }}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  )

  return (
    <div className="border-t border-border pt-6">
      <Pagination className="justify-between">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={currentPage === 1}
              className="rounded-[7px] border-border px-4 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_span]:block"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>

        <PaginationContent>
          {startPages.map(pageLink)}
          {showEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {endPages.map(pageLink)}
        </PaginationContent>

        <PaginationContent>
          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={currentPage === totalPages}
              className="rounded-[7px] border-border px-4 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_span]:block"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default ProductPagination
