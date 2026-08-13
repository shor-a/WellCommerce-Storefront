import { cn } from "@/lib/utils"

interface ProductImageThumbProps {
  src: string
  alt: string
  isActive: boolean
}

export const ProductImageThumb = ({
  src,
  alt,
  isActive,
}: ProductImageThumbProps) => (
  <button
    type="button"
    aria-pressed={isActive}
    aria-label={`View image: ${alt}`}
    className={cn(
      "aspect-square w-full overflow-hidden rounded-xl bg-secondary transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
      isActive ? "border-2 border-foreground" : "border-2 border-transparent"
    )}
  >
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover object-top"
    />
  </button>
)

export default ProductImageThumb
