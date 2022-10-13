import { Button } from '@mui/material';
import { useState } from 'react';
import { COLOR } from '../../../utils/themes/colors';
import StackWithShadow from '../../atoms/StackWithShadow/StackWithShadow';
import liff from '@line/liff';
import { useFormContext } from 'react-hook-form';
import { ICreateTripForm } from '../../pages/Home';
import { createTrip } from '../../../networks/trips';
import TwoWaysDialog from '../Dialog/TwoWaysDialog';
import { ITrip } from '../../../utils/types/model/trip';
import Lottie from 'react-lottie';
import LoadingBar from '../../../assets/lotties/loading-bar.json';

const FooterButtons = () => {
  const groupId =
    liff.getContext()?.groupId ?? 'C842305eea1dbdd7980eaaf6cac6d296a';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [trip, setTrip] = useState<ITrip | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit } = useFormContext<ICreateTripForm>();

  const createTripHandler = async (data: ICreateTripForm) => {
    try {
      setIsLoading(true);
      const response = await createTrip({
        title: data.title,
        profile: data.profile,
        members: data.members,
        groupId: groupId,
      });

      if (response) {
        setIsOpen(true);
        setTrip(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formCancleHandler = () => {
    liff.closeWindow();
  };

  const submitButtonStyles = createButtonStyles(COLOR.SUCCESS_COLOR);
  const cancleButtonStyles = createButtonStyles(COLOR.SECONDARY_COLOR);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingBar,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <StackWithShadow sx={styles.containerStyles}>
        <Button
          variant="contained"
          sx={cancleButtonStyles}
          onClick={formCancleHandler}
        >
          ยกเลิก
        </Button>
        <Button
          variant="contained"
          disabled={isLoading}
          sx={submitButtonStyles}
          onClick={handleSubmit(createTripHandler)}
        >
          {isLoading ? (
            <Lottie width={30} height={20} options={defaultOptions} />
          ) : (
            'สร้างทริป'
          )}
        </Button>
      </StackWithShadow>
      <TwoWaysDialog
        title="สร้างทริปเรียบร้อยแล้ว!"
        body={`สร้างทริป ${trip?.title} เรียบร้อยแล้ว แต่ยังทำห่าอะไรต่อไม่ได้หรอกนะ เดฟจะไปดูซีรีส์ต่อแล้วคับ`}
        agreeText={'เข้าใจ'}
        denieText={'เข้าใจ แต่เป็นสีแดง'}
        onAgreed={formCancleHandler}
        onClose={formCancleHandler}
        onDenied={formCancleHandler}
        open={isOpen && !!trip}
      />
    </>
  );
};

const styles = {
  containerStyles: { flexDirection: 'row', gap: '10px', marginTop: 'auto' },
};

const createButtonStyles = (color: string) => ({
  flexGrow: 1,
  bgcolor: color,
  '&:hover': {
    bgcolor: color,
  },
});

export default FooterButtons;
