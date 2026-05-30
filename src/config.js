export const API_BASE =
  import.meta.env.VITE_API_BASE?.trim() || 'http://localhost:8001'

export const INITIATE_PAYMENT_URL = `${API_BASE}/api/method/hesabe_xero_poc.api.payment.initiate_payment`
