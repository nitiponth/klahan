import liff from '@line/liff/dist/lib';
import { useEffect, useState } from 'react';
import { getActiveTrip } from '../../networks/groups';
import { getTrip } from '../../networks/trips';
import { ITripWithBills } from '../../utils/types/model/trip';
import Loading from '../atoms/Loading';
import SimpleLayout from '../layouts/SimpleLayout';
import TripDetailButtonGroup from '../molecules/TripDetail/TripDetailButtonGroup';
import ExpenseList from '../molecules/TripDetail/ExpenseList';
import TripSummary from '../molecules/TripDetail/TripSummary';

const Trip = () => {
  const groupId =
    liff.getContext()?.groupId ?? 'C842305eea1dbdd7980eaaf6cac6d296a';

  const [trip, setTrip] = useState<ITripWithBills>();

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const initialize = async () => {
    const trip = await getActiveTrip(groupId);
    if (trip._id) {
      const tripDetail = await getTrip(trip._id);
      setTrip(tripDetail);
    }
  };

  if (!trip) return <Loading />;

  return (
    <SimpleLayout>
      <TripSummary title={trip.title} bills={trip.bills} />
      <ExpenseList bills={trip.bills} />
      <TripDetailButtonGroup tripId={trip._id} />
    </SimpleLayout>
  );
};

export default Trip;
