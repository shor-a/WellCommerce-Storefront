import { useState } from "react"

const useOfferNavbar = () => {
  const [isDismissed, setIsDismissed] = useState(
    () => localStorage.getItem("offer-navbar-dismissed") === "true"
  )

  const dismiss = () => {
    localStorage.setItem("offer-navbar-dismissed", "true")
    setIsDismissed(true)
  }

  return { isDismissed, dismiss }
}

export default useOfferNavbar
