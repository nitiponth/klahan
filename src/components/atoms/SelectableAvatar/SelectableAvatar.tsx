import { Avatar, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { COLOR } from '../../../utils/themes/colors';
import cuteCat from '../../../assets/logo/cute-cate.jpeg';

interface Props {
  profile?: string;
  isSelected: boolean;
  onSelect: () => void;
}

const SelectableAvatar = ({ profile, isSelected, onSelect }: Props) => {
  return (
    <Stack sx={{ position: 'relative' }} onClick={onSelect}>
      <Avatar src={profile ?? cuteCat} sx={styles.avatarStyles} />
      {isSelected && <CheckCircleIcon sx={styles.checkIconStyles} />}
    </Stack>
  );
};

const styles = {
  checkIconStyles: {
    position: 'absolute',
    color: COLOR.SUCCESS_COLOR,
    bgcolor: COLOR.WHITE_COLOR,
    borderRadius: 100,
    bottom: 0,
    right: -5,
    width: 20,
    height: 20,
  },
  avatarStyles: {
    width: 50,
    height: 50,
    boxShadow: '-1px 0px 6px 0px rgba(0,0,0,0.16)',
    ':hover': {
      cursor: 'pointer',
    },
  },
};

export default SelectableAvatar;
