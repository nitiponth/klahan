import React, { useEffect, useState } from "react";
import angryCat from "./assets/logo/dummy_logo.jpeg";
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
  const [user, setUser] = useState<IUser>({
    username: undefined,
    profile: undefined,
  });

  useEffect(() => {
    initializeLIFF();
  }, []);

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
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          style={{ borderRadius: "10px" }}
          src={angryCat}
          className="App-logo"
          alt="logo"
        />
        <p>Klahan is not AGGRESSIVE cat! </p>

        <Stack direction={"row"} alignItems={"center"}>
          <Avatar src={user?.profile} sx={{ mr: "1rem" }} />
          <Typography color={"white"}>Hi {user?.username}</Typography>
        </Stack>
      </header>
    </div>
  );
}

export default App;
