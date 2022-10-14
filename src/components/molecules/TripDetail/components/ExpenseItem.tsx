import { Stack, Typography, AvatarGroup, Avatar } from '@mui/material';
import cuteCat from '../../../../assets/logo/cute-cate.jpeg';
import { IBill } from '../../../../utils/types/model/bill';

const ExpenseItem = ({ title, value, debtors }: IBill) => {
  const itemValue = value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return (
    <Stack sx={styles.itemContainer}>
      <Stack sx={styles.detailContainer}>
        <Typography variant="body2" noWrap>
          {title}
        </Typography>
        <AvatarGroup
          sx={{ marginLeft: 1 }}
          componentsProps={{
            additionalAvatar: {
              sx: styles.avatarStyles,
            },
          }}
        >
          {debtors.map((user) => (
            <Avatar
              key={user.userId}
              src={user.pictureUrl ?? cuteCat}
              sx={styles.avatarStyles}
            />
          ))}
        </AvatarGroup>
      </Stack>

      <Stack>
        <Typography variant="body1" noWrap flexGrow={10} paddingLeft={2}>
          {itemValue} ฿
        </Typography>
      </Stack>
    </Stack>
  );
};

const styles = {
  itemContainer: {
    minHeight: '30px',
    flexDirection: 'row',
    alignItems: 'center',
    mt: '0.5rem',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    overflow: 'hidden',
  },
  avatarStyles: {
    width: 25,
    height: 25,
    fontSize: '12px',
  },
};

export default ExpenseItem;
