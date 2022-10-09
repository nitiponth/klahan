import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { COLOR } from "../../../utils/themes/colors";
import StackWithShadow from "../../atoms/StackWithShadow/StackWithShadow";
import liff from "@line/liff";

const FooterButtons = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const submitButtonStyles = createButtonStyles(COLOR.SUCCESS_COLOR);
  const cancleButtonStyles = createButtonStyles(COLOR.SECONDARY_COLOR);

  const createTripHandler = () => {
    setIsOpen(true);
  };

  const formCancleHandler = () => {
    liff.closeWindow();
  };

  return (
    <>
      <StackWithShadow sx={styles.containerStyles}>
        <Button
          variant="contained"
          sx={cancleButtonStyles}
          onClick={formCancleHandler}
        >
          ยกเลิก
        </Button>
        <Button
          variant="contained"
          sx={submitButtonStyles}
          onClick={createTripHandler}
        >
          สร้างทริป
        </Button>
      </StackWithShadow>

      <Dialog open={isOpen} onClose={setIsOpen.bind(null, false)}>
        <DialogTitle>{"รีบมากหรอ ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>รีบมากก็มาเขียนเองนะไอ้เหี้ย!!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={setIsOpen.bind(null, false)}
            sx={{
              color: COLOR.SECONDARY_COLOR,
            }}
          >
            เข้าใจแต่เป็นสีแดง
          </Button>
          <Button
            onClick={setIsOpen.bind(null, false)}
            autoFocus
            sx={{
              color: COLOR.SUCCESS_COLOR,
            }}
          >
            เข้าใจ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const styles = {
  containerStyles: { flexDirection: "row", gap: "10px", marginTop: "auto" },
};

const createButtonStyles = (color: string) => ({
  flexGrow: 1,
  bgcolor: color,
  "&:hover": {
    bgcolor: color,
  },
});

export default FooterButtons;
