import liff from '@line/liff/dist/lib';
import { Typography, Stack, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getTripMembers } from '../../../networks/trips';
import { DEV_USER_ID } from '../../../utils/config';
import { createButtonStyles } from '../../../utils/functions/styles';
import { COLOR } from '../../../utils/themes/colors';
import { IUser } from '../../../utils/types/user';
import SmallLoading from '../../atoms/Loading/SmallLoading';
import SelectableAvatar from '../../atoms/SelectableAvatar/SelectableAvatar';
import StackWithShadow from '../../atoms/StackWithShadow/StackWithShadow';
import { StyledTextField } from '../../atoms/TextField';

interface Props {
  tripId: string;
}

interface ICreateBillForm {
  title: string;
  value: number;
  tripId: string;
  deptors: string[];
  creditor: string;
}

const CreateBill = ({ tripId }: Props) => {
  const userId = liff.getContext()?.userId ?? DEV_USER_ID;
  const [members, setMembers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const formMethods = useForm<ICreateBillForm>({
    defaultValues: {
      tripId,
      creditor: userId,
      deptors: [],
    },
  });

  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = formMethods;

  const initialize = async () => {
    try {
      setIsLoading(true);
      const member = await getTripMembers(tripId);
      setMembers(member);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectUserHandler = (id: string) => {
    const deptors = getValues('deptors');
    if (deptors.includes(id)) {
      setValue(
        'deptors',
        deptors.filter((uid) => uid !== id),
      );
    } else {
      setValue('deptors', [...deptors, id]);
    }
  };

  const deptors = watch('deptors');

  const deptorsSelectorBuilder = members.map(({ userId, pictureUrl }) => (
    <SelectableAvatar
      key={userId}
      isSelected={deptors.includes(userId)}
      onSelect={selectUserHandler.bind(null, userId)}
      profile={pictureUrl}
    />
  ));

  const submitButtonStyles = createButtonStyles(COLOR.SUCCESS_COLOR);

  return (
    <FormProvider {...formMethods}>
      <StackWithShadow sx={{ p: 2, minWidth: '260px', maxWidth: '80vw' }}>
        <Typography variant="h4" mb={2}>
          ไหนๆ ใครเป็นหนี้~
        </Typography>
        <Stack>
          <StyledTextField
            variant="standard"
            placeholder="ค่าหมูกระทะ 🐷"
            autoComplete="off"
            sx={{ mb: 1.5 }}
            required
            error={!!errors.title}
            FormHelperTextProps={{
              sx: {
                color: COLOR.DANGER_COLOR,
                textAlign: 'center',
              },
            }}
            helperText={errors.title ? 'ใส่ชื่อทริปให้หน่อยนะ' : ''}
          />
          <StyledTextField
            type={'number'}
            variant="standard"
            placeholder="ค่าเสียหาย 💸"
            autoComplete="off"
            required
            error={!!errors.title}
            FormHelperTextProps={{
              sx: {
                color: COLOR.DANGER_COLOR,
                textAlign: 'center',
              },
            }}
            helperText={errors.title ? 'ใส่ชื่อทริปให้หน่อยนะ' : ''}
          />
        </Stack>

        <Stack sx={styles.deptorContainer}>
          {isLoading ? <SmallLoading /> : deptorsSelectorBuilder}
        </Stack>

        <Button sx={submitButtonStyles} variant="contained">
          สร้างหนี้
        </Button>
      </StackWithShadow>
    </FormProvider>
  );
};

export default CreateBill;

const styles = {
  deptorContainer: {
    m: 2,
    mt: 5,
    mb: 5,
    flexDirection: 'row',
    gap: '12.5px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};
