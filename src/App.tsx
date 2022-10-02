import React, { useEffect, useState } from "react";
import angryCat from "./assets/logo/dummy_logo.jpeg";
import cuteCat from "./assets/logo/cute-cate.jpeg";
import "./App.css";
import liff from "@line/liff";
import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";

interface IUser {
  username: string | undefined;
  profile: string | undefined;
}

function App() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isAfterThreeSecs, setIsAfterThreeSecs] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    username: undefined,
    profile: undefined,
  });

  useEffect(() => {
    initializeLIFF();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liff.ready]);

  const initializeLIFF = async () => {
    liff.ready.then(() => {
      if (liff.isInClient()) {
        getUserProfile();
      }
    });

    const liffId = process.env.REACT_APP_LIFF_ID;
    if (!liffId) return;

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
    setTimeout(() => setIsAfterThreeSecs(true), 3000);
  };

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
