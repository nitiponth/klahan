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
import { getActiveTrip } from '../../networks/groups';
import { useNavigate } from 'react-router-dom';
import SimpleLayout from '../layouts/SimpleLayout';

export interface ICreateTripForm {
  title: string;
  members: string[];
  profile?: string;
}

const CreateTrip = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<IUser[]>([]);

  const context = liff.getContext();
  const groupId = context?.groupId ?? 'C842305eea1dbdd7980eaaf6cac6d296a';
  const navigate = useNavigate();

  const initialize = async () => {
    try {
      setIsLoading(true);
      const existedTrip = await getActiveTrip(groupId);
      if (existedTrip) {
        navigate('/error');
        return;
      }

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
      <SimpleLayout>
        <ProfileAndTitleSection />
        <MemberSelector members={members} />
        <FooterButtons />
      </SimpleLayout>
    </FormProvider>
  );
};

export default CreateTrip;
