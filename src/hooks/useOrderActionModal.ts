import { useState, useCallback } from "react"
import type { Order, OrderModalType } from "@/constants/orderHistoryConst"

interface OrderActionModalState {
  type: OrderModalType
  order: Order | null
}

export const useOrderActionModal = () => {
  const [modal, setModal] = useState<OrderActionModalState>({
    type: null,
    order: null,
  })

  const open = useCallback(
    (type: Exclude<OrderModalType, null>, order: Order) => {
      setModal({ type, order })
    },
    []
  )

  const close = useCallback(() => {
    setModal({ type: null, order: null })
  }, [])

  return {
    modalType: modal.type,
    modalOrder: modal.order,
    openModal: open,
    closeModal: close,
    isOpen: modal.type !== null,
  }
}
