import { Button, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { LOGOUT, WELCOME } from "../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { RootBox } from "../SignIn";

const Home = () => {
  const { logout } = useAuth0();

  const name = localStorage.getItem("name");

  const handleLogOut = useCallback(() => {
    logout();
    localStorage.removeItem("name");
    localStorage.removeItem("token");
  }, [logout]);

  return (
    <RootBox>
      <Typography children={WELCOME + name} variant="h3" />

      <Button variant="contained" onClick={handleLogOut}>
        {LOGOUT}
      </Button>
    </RootBox>
  );
};

export default Home;
