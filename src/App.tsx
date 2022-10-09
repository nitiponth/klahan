import { useEffect, useState } from 'react';
import './App.css';
import liff from '@line/liff';
import Loading from './components/atoms/Loading';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import { Stack } from '@mui/material';
import { COLOR } from './utils/themes/colors';

interface IUser {
  username: string | undefined;
  profile: string | undefined;
}

const ENV = process.env.REACT_APP_ENV;
const liffId = process.env.REACT_APP_LIFF_ID;

function App() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    username: undefined,
    profile: undefined,
  });

  console.log('🚀 ~ file: App.tsx ~ line 17 ~ liffId', liffId);

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
    const { displayName, pictureUrl } = await liff.getProfile();
    setUser({
      username: displayName,
      profile: pictureUrl,
    });
    setIsReady(true);
  };

  if (!isReady) return <Loading />;

  return (
    <Stack minHeight={'100vh'} bgcolor={COLOR.WHITE_COLOR}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <Swich
      <Route path="/" element={<Home />} /> */}
      {/* <header className="App-header">
        <img
          style={{ borderRadius: "10px", marginBottom: "2rem" }}
          src={isAfterThreeSecs ? angryCat : cuteCat}
          className="App-logo"
          alt="logo"
        />

        {isReady && (
          <>
            <Stack direction={"row"} alignItems={"center"}>
              <Avatar src={user?.profile} sx={{ mr: "1rem" }} />
              <Typography color={"white"}>Hi {user?.username}</Typography>
            </Stack>
            {isAfterThreeSecs && (
              <Stack mt={"1rem"}>
                <Typography color={"white"} variant="h4">
                  Fuck you!
                </Typography>
              </Stack>
            )}
          </>
        )}
      </header> */}
    </Stack>
  );
}

export default App;
