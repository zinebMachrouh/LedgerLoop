import { VALIDATION_RULES } from './constants';

export const validateAmount = (amount: number): string | null => {
  if (!amount || isNaN(amount)) {
    return 'Amount is required';
  }
  if (amount < VALIDATION_RULES.MIN_AMOUNT) {
    return `Amount must be at least ${VALIDATION_RULES.MIN_AMOUNT}`;
  }
  if (amount > VALIDATION_RULES.MAX_AMOUNT) {
    return `Amount cannot exceed ${VALIDATION_RULES.MAX_AMOUNT}`;
  }
  return null;
};
