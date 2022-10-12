import { Stack } from '@mui/material';

import { COLOR } from '../../utils/themes/colors';
import MemberSelector from '../molecules/CreateTrip/MemberSelector';
import { useForm, FormProvider } from 'react-hook-form';
import ProfileAndTitleSection from '../molecules/CreateTrip/ProfileAndTitleSection';
import FooterButtons from '../molecules/CreateTrip/FooterButtons';
import { trpc } from '../../utils/trpc';
import liff from '@line/liff/dist/lib';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IUser } from '../../utils/types/user';
export interface ICreateTripForm {
  title: string;
  members: string[];
}

const CHANNLE_ACCESS_TOKEN = process.env.REACT_APP_CHANNLE_ACCESS_TOKEN;

const Home = () => {
  const [members, setMembers] = useState<IUser[]>([]);
  const context = liff.getContext();
  const groupId = context?.groupId ?? 'Ca9c795691ae160008f29d19e5ce31521';

  const res = trpc.useQuery([
    'getMembers',
    context?.groupId ?? 'Ca9c795691ae160008f29d19e5ce31521',
  ]).data;

  useEffect(() => {
    initializeMemberChoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  const initializeMemberChoices = async () => {
    if (!res && !res?.members) return;

    try {
      const memberIds = res.members as string[];

      const tickets = memberIds.map((id) => {
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.line.me/v2/bot/group/${groupId}/member/${id}`,
          {
            headers: {
              Authorization: `Bearer ${CHANNLE_ACCESS_TOKEN}`,
            },
          },
        );
      });

      const response = await Promise.all(tickets);

      const mbs = response.map((r) => {
        return r.data;
      }) as IUser[];

      setMembers(mbs);
    } catch (error: any) {
      console.error(error);
    }
  };

  const formMethods = useForm<ICreateTripForm>({
    defaultValues: {
      title: '',
      members: [],
    },
  });

  return (
    <FormProvider {...formMethods}>
      <Stack sx={styles.containerStyles}>
        <ProfileAndTitleSection />
        <MemberSelector members={members} />
        <FooterButtons />
      </Stack>
    </FormProvider>
  );
};

const styles = {
  containerStyles: {
    flex: 1,
    bgcolor: COLOR.WHITE_COLOR,
    marginTop: '2rem',
    padding: '1rem',
  },
};

export default Home;
