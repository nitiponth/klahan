import { styled, TextField, TextFieldProps } from '@mui/material';
import { COLOR } from '../../../utils/themes/colors';

export const StyledTextField = styled(TextField)<TextFieldProps>(() => ({
  '& .MuiInput-underline:before': {
    borderBottomColor: COLOR.GRAY_2_COLOR,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: COLOR.GRAY_2_COLOR,
  },
  '& :hover:not(.Mui-disabled):before': {
    borderBottomColor: COLOR.GRAY_1_COLOR,
  },
}));
