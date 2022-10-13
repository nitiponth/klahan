import { Stack } from '@mui/material';
import { COLOR } from '../../utils/themes/colors';
import MemberSelector from '../molecules/CreateTrip/MemberSelector';
import { useForm, FormProvider } from 'react-hook-form';
import ProfileAndTitleSection from '../molecules/CreateTrip/ProfileAndTitleSection';
import FooterButtons from '../molecules/CreateTrip/FooterButtons';
import liff from '@line/liff/dist/lib';
import { useEffect, useState } from 'react';
import { IUser } from '../../utils/types/user';
import { getMembers } from '../../networks/members';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Loading from '../atoms/Loading';

export interface ICreateTripForm {
  title: string;
  members: string[];
  profile?: string;
}

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<IUser[]>([]);
  const context = liff.getContext();
  const groupId = context?.groupId ?? 'C842305eea1dbdd7980eaaf6cac6d296a';

  const initialize = async () => {
    try {
      setIsLoading(true);
      const users = await getMembers(groupId);

      setMembers(users);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const schema = yup.object().shape({
    title: yup.string().required(),
    members: yup.array().of(yup.string()).min(1),
    profile: yup.string().nullable(),
  });

  const formMethods = useForm<ICreateTripForm>({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
    defaultValues: {
      members: [],
    },
  });

  if (isLoading) return <Loading />;

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
