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
  startPages: number[]
  endPages: number[]
}

export const ProductPagination = ({
  currentPage,
  startPages,
  endPages,
}: ProductPaginationProps) => (
  <div className="border-t border-border pt-6">
    <Pagination className="justify-between">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="rounded-[7px] border-border px-4 [&_span]:block"
          />
        </PaginationItem>
      </PaginationContent>

      <PaginationContent>
        {startPages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              className={
                page === currentPage
                  ? "rounded-[7px] border-transparent bg-secondary text-foreground hover:bg-secondary"
                  : "rounded-[7px] border-transparent"
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {endPages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              className={
                page === currentPage
                  ? "rounded-[7px] border-transparent bg-secondary text-foreground hover:bg-secondary"
                  : "rounded-[7px] border-transparent"
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>

      <PaginationContent>
        <PaginationItem>
          <PaginationNext
            href="#"
            className="rounded-[7px] border-border px-4 [&_span]:block"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
)

export default ProductPagination
