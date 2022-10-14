import { IUser } from '../user';

export interface IBill {
  _id: string;
  title: string;
  value: number;
  debtors: IUser[];
  creditor: string;
  tripId: string;
}
