import { useEffect, useState } from 'react';
import './App.css';
import liff from '@line/liff';
import Loading from './components/atoms/Loading';
import { Route, Routes } from 'react-router-dom';
import CreateTrip from './components/pages/CreateTrip';
import { Stack } from '@mui/material';
import { COLOR } from './utils/themes/colors';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './utils/trpc';
import { UserContextTypes, useUserContext } from './contexts/userContext';
import Trip from './components/pages/Trip';
import Error from './components/pages/Error';

const ENV = process.env.REACT_APP_ENV;
const liffId = process.env.REACT_APP_LIFF_ID;
const BASE_URL = process.env.REACT_APP_BASE_URL ?? '';

function App() {
  const { dispatch } = useUserContext();

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: BASE_URL,
    }),
  );

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    initializeLIFF();
    if (ENV === 'DEVELOPMENT') {
      setTimeout(() => {
        setIsReady(true);
      }, 1_000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liff.ready]);

  const initializeLIFF = async () => {
    liff.ready.then(() => {
      if (liff.isInClient()) {
        getUserProfile();
      } else {
        console.error('liff not in client.');
      }
    });

    if (!liffId) {
      console.error('liff ID not found.');
      return;
    }

    await liff.init({
      liffId,
    });
  };

  const getUserProfile = async () => {
    const profile = await liff.getProfile();

    dispatch({ type: UserContextTypes.SET_USER, payload: profile });

    setIsReady(true);
  };

  if (!isReady) return <Loading />;

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Stack minHeight={'100vh'} bgcolor={COLOR.WHITE_COLOR}>
          <Routes>
            <Route path="/" element={<Trip />} />
            <Route path="/createTrip" element={<CreateTrip />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </Stack>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
