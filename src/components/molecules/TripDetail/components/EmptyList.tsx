import { Stack, Typography } from '@mui/material';
import { COLOR } from '../../../../utils/themes/colors';

const EmptyList = () => {
  return (
    <Stack sx={styles.containerStyles}>
      <Typography variant="body1" sx={styles.textStyles}>
        ยังไม่มีรายการหนี้ของใครเลย
      </Typography>
      <Typography variant="body1" sx={styles.textStyles}>
        {'กด "จดบิลใหม่" ข้างล่าง'}
      </Typography>
      <Typography variant="body1" sx={styles.textStyles}>
        {'เพื่อบันทึกหนี้สินได้เลยคับบ 😛'}
      </Typography>
    </Stack>
  );
};

const styles = {
  containerStyles: {
    alignItems: 'center',
    my: 7,
  },
  textStyles: {
    color: COLOR.CREAM_3_COLOR,
    mb: 1,
  },
};

export default EmptyList;
