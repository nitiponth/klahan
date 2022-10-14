import { IUser } from '../user';
import { IBill } from './bill';

export interface ITrip {
  _id: string;
  title: string;
  members: string[];
  groupId: string;
}

export type ITripWithBills = ITrip & {
  members: IUser[];
  bills: IBill[];
};
