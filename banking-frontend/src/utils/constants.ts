export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
} as const;

export const VALIDATION_RULES = {
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 1000000
} as const;

export const DATE_FORMAT = 'dd/MM/yyyy';
export const CURRENCY_CODE = 'USD';