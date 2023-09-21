import { Button, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { SIGN_IN, UNAUTHORISED } from "../utils/constants";
import { RootBox } from "../SignIn";
import { useNavigate } from "react-router-dom";

const Unauthorised = () => {
  const navigate = useNavigate();

  const renderSignIn = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <RootBox>
      <Typography children={UNAUTHORISED} variant="h3" />

      <Button variant="contained" onClick={renderSignIn}>
        {SIGN_IN}
      </Button>
    </RootBox>
  );
};

export default Unauthorised;
