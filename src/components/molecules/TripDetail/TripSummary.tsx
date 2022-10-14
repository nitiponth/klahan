import { Stack, Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { COLOR } from '../../../utils/themes/colors';
import StackWithShadow from '../../atoms/StackWithShadow/StackWithShadow';
import cuteCat from '../../../assets/logo/cute-cate.jpeg';
import { BOX_SHADOW } from '../../../utils/themes/commonStyles';
import { IBill } from '../../../utils/types/model/bill';

interface Props {
  title: string;
  profile?: string;
  bills: IBill[];
}

const TripSummary = ({ bills, title, profile }: Props) => {
  const sumOfDebt = bills.reduce((acc, curr) => {
    return (acc += curr.value);
  }, 0);

  const isHaveDebt = sumOfDebt > 0;

  const summaryDebtText = isHaveDebt
    ? `${sumOfDebt.toLocaleString()} ฿`
    : 'ยังไม่มีรายการหนี้ค้าบบบ~';

  return (
    <StackWithShadow sx={styles.containerStyles}>
      <Stack width={'100%'} overflow={'hidden'} flexGrow={1} rowGap={1.5}>
        <Typography variant="h4" noWrap sx={{ color: COLOR.CREAM_4_COLOR }}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          noWrap
          sx={{
            color: isHaveDebt ? COLOR.SECONDARY_COLOR : COLOR.CREAM_3_COLOR,
          }}
        >
          {summaryDebtText}
        </Typography>
      </Stack>

      <img
        src={profile ?? cuteCat}
        style={styles.tripProfileStyles as CSSProperties}
        alt="trip profile"
      />
    </StackWithShadow>
  );
};

const styles = {
  containerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: '1.25rem',
    mb: '1rem',
    bgcolor: COLOR.CREAM_1_COLOR,
    gap: 2,
  },
  tripProfileStyles: {
    width: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: BOX_SHADOW,
  },
};

export default TripSummary;
