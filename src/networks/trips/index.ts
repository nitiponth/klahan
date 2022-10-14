import { ITrip, ITripWithBills } from '../../utils/types/model/trip';
import { IBaseResponse } from '../../utils/types/network';
import { IUser } from '../../utils/types/user';
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

export const getTrip = async (tripId: string) => {
  const response = await axiosInstance.get<IBaseResponse<ITripWithBills>>(
    '/trips.get',
    {
      params: {
        input: `"${tripId}"`,
      },
    },
  );

  return response.data.result.data;
};

export const getTripMembers = async (tripId: string) => {
  const response = await axiosInstance.get<IBaseResponse<IUser[]>>(
    '/trips.getMembers',
    {
      params: {
        input: `"${tripId}"`,
      },
    },
  );

  return response.data.result.data;
};
