import { Account } from './account.interface';

export interface AccountWithCountAndOrderQty extends Account {
    count: number,
    orderQty: number
  }