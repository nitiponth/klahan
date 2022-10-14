import { Stack, StackProps } from '@mui/material';
import { COLOR } from '../../utils/themes/colors';

const SimpleLayout = ({ sx, children, ...rest }: StackProps) => {
  return (
    <Stack sx={{ ...styles.containerStyles, ...sx }} {...rest}>
      {children}
    </Stack>
  );
};

const styles = {
  containerStyles: {
    flex: 1,
    bgcolor: COLOR.GRAY_1_COLOR,
    pt: '1rem',
    padding: '1rem',
  },
};
export default SimpleLayout;
