import React, { useCallback, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import {
  EMAIL,
  EMAIL_PLACEHOLDER,
  GO_TO,
  NAME,
  NAME_PLACEHOLDER,
  PASSWORD,
  PASSWORD_PLACEHOLDER,
  SIGN_IN,
  SIGN_UP,
} from "../utils/constants";
import { signUp } from "../utils/functions";
import { RootBox, ContenBox, StyledTypography } from "../SignIn";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newEmail = event.target.value;
      setEmail(newEmail);
    },
    []
  );

  const handlePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = event.target.value;
      setPassword(newPassword);
    },
    []
  );

  const handleName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newName = event.target.value;
      setName(newName);
    },
    []
  );

  const handleSignUp = useCallback(async () => {
    const registered = await signUp({
      email: email,
      password: password,
      name: name,
    });

    if (registered) {
      navigate("/");
    }
  }, [email, name, navigate, password]);

  const renderSignIn = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <RootBox data-testid="sign-up">
      <Typography children={SIGN_UP} variant="h3" />

      <ContenBox>
        <TextField
          fullWidth
          label={NAME}
          value={name}
          placeholder={NAME_PLACEHOLDER}
          variant="outlined"
          onChange={handleName}
        />

        <TextField
          fullWidth
          label={EMAIL}
          value={email}
          placeholder={EMAIL_PLACEHOLDER}
          variant="outlined"
          onChange={handleEmail}
        />

        <TextField
          fullWidth
          label={PASSWORD}
          value={password}
          placeholder={PASSWORD_PLACEHOLDER}
          variant="outlined"
          type="password"
          onChange={handlePassword}
        />

        <Button variant="contained" onClick={handleSignUp}>
          {SIGN_UP}
        </Button>

        <StyledTypography
          children={GO_TO + SIGN_IN}
          variant="caption"
          onClick={renderSignIn}
        />
      </ContenBox>
    </RootBox>
  );
};

export default SignUp;
