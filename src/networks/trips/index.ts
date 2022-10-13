import { ITrip } from '../../utils/types/model/trip';
import { IBaseResponse } from '../../utils/types/network';
import { axiosInstance } from '../instance';

interface ICreateTripParams {
  title: string;
  members: string[];
  groupId: string;
  profile?: string;
}

export const createTrip = async (params: ICreateTripParams) => {
  const response = await axiosInstance.post<IBaseResponse<ITrip>>(
    '/trips.create',
    params,
  );

  return response.data.result.data;
};
