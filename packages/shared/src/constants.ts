// Application constants

export const ORDER_TYPES = {
  DINE_IN: 'dine_in',
  TAKEAWAY: 'takeaway',
  DELIVERY: 'delivery',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  REFUNDED: 'refunded',
} as const;

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  DIGITAL_WALLET: 'digital_wallet',
} as const;

export const ORDER_TYPE_LABELS = {
  [ORDER_TYPES.DINE_IN]: 'Tại quán',
  [ORDER_TYPES.TAKEAWAY]: 'Mang đi',
  [ORDER_TYPES.DELIVERY]: 'Giao hàng',
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Chờ xử lý',
  [ORDER_STATUS.PREPARING]: 'Đang chuẩn bị',
  [ORDER_STATUS.READY]: 'Sẵn sàng',
  [ORDER_STATUS.COMPLETED]: 'Hoàn thành',
  [ORDER_STATUS.CANCELLED]: 'Đã hủy',
} as const;

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: 'Chưa thanh toán',
  [PAYMENT_STATUS.PAID]: 'Đã thanh toán',
  [PAYMENT_STATUS.REFUNDED]: 'Đã hoàn tiền',
} as const;

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CASH]: 'Tiền mặt',
  [PAYMENT_METHODS.CARD]: 'Thẻ',
  [PAYMENT_METHODS.DIGITAL_WALLET]: 'Ví điện tử',
} as const;
