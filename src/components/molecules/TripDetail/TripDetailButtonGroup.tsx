import { Button, Modal, Stack } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createButtonStyles } from '../../../utils/functions/styles';
import { COLOR } from '../../../utils/themes/colors';
import { BOX_SHADOW } from '../../../utils/themes/commonStyles';
import StackWithShadow from '../../atoms/StackWithShadow/StackWithShadow';
import CreateBill from '../CreateBill/CreateBill';

interface Props {
  tripId: string;
}

const TripDetailButtonGroup = ({ tripId }: Props) => {
  const [activeBillForm, setActiveBillForm] = useState<boolean>(false);

  const checkButtonStyles = createButtonStyles(COLOR.SUCCESS_COLOR);
  const submitButtonStyles = createButtonStyles(COLOR.NOTIFY_COLOR);
  const endButtonStyles = createButtonStyles(COLOR.WHITE_COLOR);

  return (
    <Stack mt={'auto'}>
      <StackWithShadow sx={styles.containerStyles}>
        <Button
          variant="contained"
          sx={submitButtonStyles}
          onClick={setActiveBillForm.bind(null, true)}
        >
          จดบิลใหม่
        </Button>
        <Button variant="contained" sx={checkButtonStyles} onClick={() => {}}>
          สรุปหนี้
        </Button>
      </StackWithShadow>

      <Stack>
        <Button
          variant="contained"
          disabled
          sx={[
            endButtonStyles,
            {
              height: '50px',
              color: COLOR.SECONDARY_COLOR,
              boxShadow: BOX_SHADOW,
            },
          ]}
          onClick={undefined}
        >
          ปิดทริป
        </Button>
      </Stack>
      <Modal
        open={activeBillForm}
        onClose={setActiveBillForm.bind(null, false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Stack bgcolor={COLOR.WHITE_COLOR} borderRadius={'10px'}>
          <CreateBill tripId={tripId} />
        </Stack>
      </Modal>
      {/* <TwoWaysDialog
        title="สร้างทริปเรียบร้อยแล้ว!"
        body={'สร้างทริปเรียบร้อยแล้ว พี่หาญรอทวงเงินจากทุกคนไม่ไหวแล้วล่ะ! 🥳'}
        agreeText={'ไปดูทริป'}
        denieText={'กลับไปยังแชท'}
        onAgreed={onNavigateToTripDetail}
        onDenied={liff.closeWindow}
        onClose={undefined}
        open={false}
      /> */}
    </Stack>
  );
};

const styles = {
  containerStyles: { flexDirection: 'row', gap: '10px', my: '1rem' },
};

export default TripDetailButtonGroup;
