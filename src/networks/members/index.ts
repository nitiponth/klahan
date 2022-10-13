import { IBaseResponse } from '../../utils/types/network';
import { IUser } from '../../utils/types/user';
import { axiosInstance } from '../instance';

export interface IGetMemberResponse {
  members: IUser[];
}

export const getMembers = async (groupId: string) => {
  const res = await axiosInstance.get<IBaseResponse<IGetMemberResponse>>(
    '/members.getAll',
    {
      params: {
        input: `"${groupId}"`,
      },
    },
  );

  return res.data.result.data.members;
};
