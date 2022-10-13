import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from '@mui/material';
import React from 'react';
import { COLOR } from '../../../utils/themes/colors';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  body: string;
  onDenied: () => void;
  onAgreed: () => void;
  agreeText: string;
  denieText: string;
}

const TwoWaysDialog = (props: Props) => {
  const {
    onClose,
    open,
    title,
    body,
    onDenied,
    onAgreed,
    agreeText,
    denieText,
  } = props;

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDenied} sx={{ color: COLOR.SECONDARY_COLOR }}>
            {denieText}
          </Button>
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

export default TwoWaysDialog;
