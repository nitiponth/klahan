import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from '@mui/material';
import { COLOR } from '../../../utils/themes/colors';

interface Props {
  open: boolean;
  onClose?: () => void;
  title: string;
  body: string;
  onAgreed: () => void;
  agreeText: string;
}

const SimpleDialog = (props: Props) => {
  const { onClose, open, title, body, onAgreed, agreeText } = props;

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onAgreed}
            autoFocus
            sx={{ color: COLOR.SUCCESS_COLOR }}
          >
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SimpleDialog;
