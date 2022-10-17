import { Stack, Typography, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ICreateBillForm } from '../../../../networks/bills';
import { IUser } from '../../../../utils/types/user';
import SelectableAvatar from '../../../atoms/SelectableAvatar/SelectableAvatar';

interface Props {
  members: IUser[];
}

const HeaderAndCreditor = ({ members }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);

  const { setValue, watch } = useFormContext<ICreateBillForm>();

  const creditor = watch('creditor');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (anchorEl) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const setCreditorHandler = (id: string) => {
    setValue('creditor', id);
    handleClose();
  };

  const currentCreditor = members.find((member) => member.userId === creditor);
  const MenuListBuilder = members.map((m) => (
    <MenuItem key={m.userId} onClick={setCreditorHandler.bind(null, m.userId)}>
      <SelectableAvatar
        isSelected={false}
        profile={m.pictureUrl}
        avatarStyles={{ width: 28, height: 28 }}
      />
    </MenuItem>
  ));

  return (
    <Stack sx={styles.containerStyles}>
      <Typography variant="h4">ไหนๆ ใครเป็นหนี้~</Typography>
      <Stack component={'div'} position={'relative'} onClick={handleClick}>
        <SelectableAvatar
          isSelected={false}
          profile={currentCreditor?.pictureUrl}
          avatarStyles={{ width: 28, height: 28 }}
        />
        <Stack sx={styles.crownIcon}>👑</Stack>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorReference={'anchorEl'}
          PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none' } }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 15, vertical: 25 }}
          sx={{ height: '250px' }}
        >
          {MenuListBuilder}
        </Menu>
      </Stack>
    </Stack>
  );
};

const styles = {
  containerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 4,
  },
  crownIcon: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: -18,
  },
};

export default HeaderAndCreditor;
