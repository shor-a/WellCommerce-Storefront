import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement> & { className?: string }

/** Long-sleeved shirt silhouette */
export const LongSleevedIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  >
    {/* collar */}
    <path d="M9 2 C9 2 10 5 12 5 C14 5 15 2 15 2" />
    {/* left long sleeve */}
    <path d="M9 2 L2 8 L1 14 L4 14.5 L5 9 L6 20 L18 20 L19 9 L20 14.5 L23 14 L22 8 L15 2" />
  </svg>
)

/** Shorts silhouette */
export const ShortsIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="3" rx="1" />
    <path d="M3 6 L5 18 L11 18 L12 11" />
    <path d="M21 6 L19 18 L13 18 L12 11" />
    <path d="M3 6 L21 6" />
  </svg>
)

/** Jeans / trousers silhouette */
export const JeansIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="2" width="18" height="3" rx="1" />
    <path d="M3 5 L5 22 L11 22 L12 12" />
    <path d="M21 5 L19 22 L13 22 L12 12" />
    <line x1="10" y1="2" x2="10" y2="5" />
    <line x1="14" y1="2" x2="14" y2="5" />
  </svg>
)

/** Hoodie silhouette with hood */
export const HoodieIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M9 2 C9 2 7 3.5 7 6 C7 8.5 9 9.5 12 9.5 C15 9.5 17 8.5 17 6 C17 3.5 15 2 15 2" />
    <path d="M9 2 L3 7 L2 12 L5 12.5 L6 8.5" />
    <path d="M15 2 L21 7 L22 12 L19 12.5 L18 8.5" />
    <path d="M6 8.5 L5 22 L19 22 L18 8.5" />
    <path d="M8.5 15 Q12 13.5 15.5 15 L15.5 21 L8.5 21 Z" />
    <line x1="10.5" y1="9.5" x2="10" y2="12" />
    <line x1="13.5" y1="9.5" x2="14" y2="12" />
  </svg>
)
