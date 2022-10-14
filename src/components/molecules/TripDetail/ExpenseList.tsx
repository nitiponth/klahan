import { Typography } from '@mui/material';
import { IBill } from '../../../utils/types/model/bill';
import StackWithShadow from '../../atoms/StackWithShadow/StackWithShadow';
import EmptyList from './components/EmptyList';
import ExpenseItem from './components/ExpenseItem';

interface Props {
  bills: IBill[];
}

const ExpenseList = ({ bills }: Props) => {
  const billItemBuilder = bills.map((item) => (
    <ExpenseItem key={item._id} {...item} />
  ));

  const shouldRenderBillItem = billItemBuilder.length > 0;

  return (
    <StackWithShadow sx={styles.listContainer}>
      <Typography variant="body1" mb={'0.5rem'}>
        บัญชีหนังหมา 🐶
      </Typography>
      {shouldRenderBillItem ? billItemBuilder : <EmptyList />}
    </StackWithShadow>
  );
};

const styles = {
  listContainer: {
    p: '1.25rem',
    flexShink: 10,
    overflowY: 'scroll',
  },
};

export default ExpenseList;
