export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL'
}

export interface Transaction {
  date: string;
  type: TransactionType;
  amount: number;
  balance: number;
}