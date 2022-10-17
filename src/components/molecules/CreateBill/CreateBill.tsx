import liff from '@line/liff/dist/lib';
import { Stack, Button, FormHelperText } from '@mui/material';
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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createBill, ICreateBillForm } from '../../../networks/bills';
import HeaderAndCreditor from './components/HeaderAndCreditor';
import AvatarSkeletion from '../Skeletons/AvatarSkeletion';

interface Props {
  tripId: string;
  callback: () => void;
}

const CreateBill = ({ tripId, callback }: Props) => {
  const userId = liff.getContext()?.userId ?? DEV_USER_ID;
  const [members, setMembers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const schema = yup.object().shape({
    title: yup.string().required(),
    value: yup.number().min(1).required(),
    tripId: yup.string().required(),
    debtors: yup.array().of(yup.string()).min(1).required(),
    creditor: yup.string().required(),
  });

  const formMethods = useForm<ICreateBillForm>({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
    defaultValues: {
      tripId,
      creditor: userId,
    },
  });

  const {
    register,
    handleSubmit,
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
      setValue(
        'debtors',
        member.map((m) => m.userId),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectUserHandler = (id: string) => {
    const debtors = getValues('debtors');
    if (debtors.includes(id)) {
      setValue(
        'debtors',
        debtors.filter((uid) => uid !== id),
      );
    } else {
      setValue('debtors', [...deptors, id], {
        shouldValidate: true,
      });
    }
  };

  const deptors = watch('debtors');

  const deptorsSelectorBuilder = members.map(({ userId, pictureUrl }) => (
    <SelectableAvatar
      key={userId}
      isSelected={deptors.includes(userId)}
      onSelect={selectUserHandler.bind(null, userId)}
      profile={pictureUrl}
    />
  ));

  const submitButtonStyles = createButtonStyles(COLOR.SUCCESS_COLOR);

  const onSubmit = async (data: ICreateBillForm) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await createBill(data);
      if (res) {
        callback();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const AvatarSkeletonGroup = new Array(6).fill(1).map((_, idx) => {
    return <AvatarSkeletion key={idx} />;
  });

  return (
    <FormProvider {...formMethods}>
      <StackWithShadow sx={{ p: 2, minWidth: '260px', maxWidth: '80vw' }}>
        <HeaderAndCreditor members={members} />

        <Stack>
          <StyledTextField
            {...register('title')}
            variant="standard"
            placeholder="ค่าหมูกระทะ 🐷"
            autoComplete="off"
            sx={{ mb: 1.5 }}
            inputProps={{ style: { textAlign: 'center' } }}
            required
            error={!!errors.title}
            FormHelperTextProps={styles.formHelperProps}
            helperText={errors.title ? 'ใช่ชื่อรายการให้หน่อยสิ' : ''}
          />
          <StyledTextField
            {...register('value')}
            type={'number'}
            variant="standard"
            placeholder="ค่าเสียหาย 💸"
            autoComplete="off"
            inputProps={{ style: { textAlign: 'center' } }}
            required
            error={!!errors.value}
            FormHelperTextProps={styles.formHelperProps}
            helperText={errors.value ? 'ไม่มีหนี้หรอ ?' : ''}
          />
        </Stack>

        <Stack alignItems={'center'} my={5}>
          <Stack sx={styles.deptorContainer}>
            {isLoading ? AvatarSkeletonGroup : deptorsSelectorBuilder}
          </Stack>
          {errors.debtors && (
            <FormHelperText sx={{ color: COLOR.SECONDARY_COLOR }}>
              ถ้าไม่มีลูกหนี้ก็บันทึกไม่ได้น้าา ~
            </FormHelperText>
          )}
        </Stack>

        <Button
          sx={submitButtonStyles}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? <SmallLoading /> : 'สร้างหนี้'}
        </Button>
      </StackWithShadow>
    </FormProvider>
  );
};

export default CreateBill;

const styles = {
  deptorContainer: {
    m: 2,
    flexDirection: 'row',
    gap: '12.5px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  formHelperProps: {
    sx: {
      color: COLOR.DANGER_COLOR,
      textAlign: 'center',
    },
  },
};
