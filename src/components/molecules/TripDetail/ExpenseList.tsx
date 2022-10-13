import { Typography } from '@mui/material';
import StackWithShadow from '../../atoms/StackWithShadow/StackWithShadow';
import ExpenseItem from './components/ExpenseItem';

interface ItemProps {
  title: string;
  value: number;
}

const ExpenseList = () => {
  const dummiyItem: ItemProps[] = [
    {
      title: 'น้ำมันฟรีจ่ายโดยน้องไข่หมี',
      value: 1800,
    },
    {
      title: 'ซัพเวย์ของอาบัง',
      value: 229,
    },

    {
      title: 'ค่ามาม่า',
      value: 300,
    },
    {
      title: 'ค่าประกันชีวิต',
      value: 10000,
    },
    {
      title: 'ค่าเข้าอุทยาน',
      value: 300,
    },
    {
      title: 'ค่าเต้นท์',
      value: 900,
    },
  ];

  return (
    <StackWithShadow sx={styles.listContainer}>
      <Typography variant="body1" mb={'0.5rem'}>
        บัญชีหนังหมา 🐶
      </Typography>
      {dummiyItem.map((item, idx) => (
        <ExpenseItem key={idx} title={item.title} value={item.value} />
      ))}
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
