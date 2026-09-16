/** Format a raw input value as groups of 4 digits: "4532015112830366" → "4532 0151 1283 0366" */
export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(.{4})/g, "$1 ").trim()
}

/** Format a raw input value as MM/YY: "1228" → "12/28" */
export const formatExpiry = (value: string): string => {
  const raw = value.replace(/\D/g, "").slice(0, 4)
  return raw.length > 2 ? raw.slice(0, 2) + "/" + raw.slice(2) : raw
}

/** Strip non-digits and cap at 3 characters for CVV */
export const formatCvv = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 3)
