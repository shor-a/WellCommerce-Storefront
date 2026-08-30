import type { StatusCodes } from "http-status-codes"

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: number
  password: string
}

export interface RegisterResponse {
  status: StatusCodes
  message: string
}
