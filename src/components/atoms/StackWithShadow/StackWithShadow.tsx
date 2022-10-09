import { SxProps } from "@mui/material";
import { Stack } from "@mui/system";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  sx?: SxProps;
}

const StackWithShadow = ({ children, sx }: Props) => {
  return (
    <Stack
      sx={{
        minHeight: "50px",
        boxShadow: "-1px 0px 6px 0px rgba(0,0,0,0.16)",
        borderRadius: "10px",
        padding: "10px",
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};

export default StackWithShadow;
