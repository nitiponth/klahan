import {
  Button,
  Stack,
  styled,
  SxProps,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { CSSProperties } from 'react';
import { COLOR } from '../../../utils/themes/colors';
import StackWithShadow from '../../atoms/StackWithShadow/StackWithShadow';
import AddIcon from '@mui/icons-material/Add';
import { useFormContext } from 'react-hook-form';
import cuteCat from '../../../assets/logo/cute-cate.jpeg';

const ProfileAndTitleSection = () => {
  const { register } = useFormContext();

  return (
    <Stack>
      <Typography variant="h4" mb={'1.5rem'}>
        ไหนบอกรายละเอียดหน่อยสิ้
      </Typography>

      <StackWithShadow sx={{ py: '2rem', mb: '2.5rem' }}>
        <Stack alignItems={'center'} mb={'3rem'}>
          <Button sx={{ ...styles.imageButtonStyles, position: 'relative' }}>
            <img
              src={cuteCat}
              alt="test"
              style={styles.imageStyles as CSSProperties}
            />
            <AddIcon
              sx={{ zIndex: 100, color: COLOR.WHITE_COLOR, fontSize: '40px' }}
            />
          </Button>
        </Stack>

        <Stack alignItems={'center'}>
          <TitleTextField
            {...register('title')}
            label=""
            variant="standard"
            placeholder="อยากให้เรียกชื่อทริปนี้ว่าอะไร"
          />
        </Stack>
      </StackWithShadow>
    </Stack>
  );
};

const TitleTextField = styled(TextField)<TextFieldProps>(() => ({
  '& .MuiInput-underline:before': {
    borderBottomColor: COLOR.GRAY_2_COLOR,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: COLOR.GRAY_2_COLOR,
  },
}));

const styles: Record<string, CSSProperties | SxProps> = {
  imageButtonStyles: {
    width: 150,
    height: 150,
    borderRadius: 100,
    bgcolor: COLOR.GRAY_2_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: COLOR.GRAY_2_COLOR,
    },
  },
  imageStyles: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 150,
    height: 150,
    borderRadius: 100,
    objectFit: 'cover',
    opacity: 0.15,
  },
};

export default ProfileAndTitleSection;
