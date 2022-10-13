import { Button, Stack } from '@mui/material';
import { createButtonStyles } from '../../../utils/functions/styles';
import { COLOR } from '../../../utils/themes/colors';
import { BOX_SHADOW } from '../../../utils/themes/commonStyles';
import StackWithShadow from '../../atoms/StackWithShadow/StackWithShadow';
import TwoWaysDialog from '../Dialog/TwoWaysDialog';

const Checkout = () => {
  const formCancleHandler = () => {};

  const checkButtonStyles = createButtonStyles(COLOR.SUCCESS_COLOR);
  const submitButtonStyles = createButtonStyles(COLOR.NOTIFY_COLOR);
  const endButtonStyles = createButtonStyles(COLOR.WHITE_COLOR);

  return (
    <Stack mt={'auto'}>
      <StackWithShadow sx={styles.containerStyles}>
        <Button
          variant="contained"
          sx={submitButtonStyles}
          onClick={formCancleHandler}
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
          sx={[
            endButtonStyles,
            {
              height: '50px',
              color: COLOR.SECONDARY_COLOR,
              boxShadow: BOX_SHADOW,
            },
          ]}
          onClick={formCancleHandler}
        >
          ปิดทริป
        </Button>
      </Stack>
      <TwoWaysDialog
        title="สร้างทริปเรียบร้อยแล้ว!"
        body={'sdsdsd'}
        agreeText={'เข้าใจ'}
        denieText={'เข้าใจ แต่เป็นสีแดง'}
        onAgreed={formCancleHandler}
        onClose={formCancleHandler}
        onDenied={formCancleHandler}
        open={false}
      />
    </Stack>
  );
};

const styles = {
  containerStyles: { flexDirection: 'row', gap: '10px', my: '1rem' },
};

export default Checkout;
