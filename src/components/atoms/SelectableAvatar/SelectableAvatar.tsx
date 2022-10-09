import { Avatar, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { COLOR } from '../../../utils/themes/colors';

interface Props {
  profile: string;
  isSelected: boolean;
  onSelect: () => void;
}

const SelectableAvatar = ({ profile, isSelected, onSelect }: Props) => {
  return (
    <Stack sx={{ position: 'relative' }} onClick={onSelect}>
      <Avatar src={profile} sx={{ width: 50, height: 50 }} />
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
};

export default SelectableAvatar;
