import { IBill } from '../../utils/types/model/bill';
import { IBaseResponse } from '../../utils/types/network';
import { axiosInstance } from '../instance';

export interface ICreateBillForm {
  title: string;
  value: number;
  debtors: string[];
  creditor: string;
  tripId: string;
}

export const createBill = async (params: ICreateBillForm) => {
  const response = await axiosInstance.post<IBaseResponse<IBill>>(
    '/bills.create',
    params,
  );

  return response.data.result.data;
};
