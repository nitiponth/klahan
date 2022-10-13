import SimpleLayout from '../layouts/SimpleLayout';
import Checkout from '../molecules/TripDetail/Checkout';
import ExpenseList from '../molecules/TripDetail/ExpenseList';
import TripSummary from '../molecules/TripDetail/TripSummary';

const Trip = () => {
  return (
    <SimpleLayout>
      <TripSummary />
      <ExpenseList />
      <Checkout />
    </SimpleLayout>
  );
};

export default Trip;
