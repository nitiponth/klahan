import { Stack, Typography } from '@mui/material';
import SelectableAvatar from '../../atoms/SelectableAvatar/SelectableAvatar';
import StackWithShadow from '../../atoms/StackWithShadow/StackWithShadow';
import cuteCat from '../../../assets/logo/cute-cate.jpeg';
import { useFormContext } from 'react-hook-form';
import { ICreateTripForm } from '../../pages/Home';
import { IUser } from '../../../utils/types/user';

interface Props {
  members?: IUser[];
}

const MemberSelector = ({ members = [] }: Props) => {
  const { watch, setValue } = useFormContext<ICreateTripForm>();

  const selectedMembers = watch('members');

  const memberClickHandler = (userId: string) => {
    if (selectedMembers.includes(userId)) {
      setValue(
        'members',
        selectedMembers.filter((member) => member !== userId),
      );
    } else {
      setValue('members', [...selectedMembers, userId]);
    }
  };

  return (
    <Stack mb={'3rem'}>
      <Typography variant="h4" mb={'1.5rem'}>
        มีใครไปบ้างล่ะ ?
      </Typography>
      <StackWithShadow sx={styles.membersContainer}>
        {members.map((member, idx) => (
          <SelectableAvatar
            key={idx}
            profile={member.pictureUrl ?? cuteCat}
            isSelected={selectedMembers.includes(`#${idx}`)}
            onSelect={memberClickHandler.bind(null, `#${idx}`)}
          />
        ))}
      </StackWithShadow>
    </Stack>
  );
};

const styles = {
  membersContainer: {
    justifyContent: 'center',
    py: '1rem',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: '10px',
  },
};

export default MemberSelector;
