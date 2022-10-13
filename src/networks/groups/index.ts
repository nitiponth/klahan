import { ITrip } from '../../utils/types/model/trip';
import { IBaseResponse } from '../../utils/types/network';
import { axiosInstance } from '../instance';

interface IGetActiveTripResponse {
  trip: ITrip;
}

export const getActiveTrip = async (groupId: string) => {
  const response = await axiosInstance.get<
    IBaseResponse<IGetActiveTripResponse>
  >('/groups.getActiveTrip', {
    params: {
      input: `"${groupId}"`,
    },
  });

  return response.data.result.data.trip;
};
