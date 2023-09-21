import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  AUTH0_SOCIAL_LOGIN,
  EMAIL,
  EMAIL_PLACEHOLDER,
  GO_TO,
  PASSWORD,
  PASSWORD_PLACEHOLDER,
  SIGN_IN,
  SIGN_UP,
  WITH_GOOGLE,
} from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { getUserInfoAuth0, login } from "../utils/functions";

export const RootBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  height: "90vh",
}));

export const ContenBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "50%",
}));

export const LoaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
}));

export const StyledTypography = styled(Typography)({
  cursor: "pointer",
  color: "blue",
});

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

  const handleClose = () => setLoading(false);

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    const isAuthenticated = await login({ email: email, password: password });
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [email, navigate, password]);

  const handleGoogleSignIn = useCallback(() => {
    setLoading(true);
    window.location.href = AUTH0_SOCIAL_LOGIN;
  }, []);

  const renderSignUp = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const getUserInfo = useCallback(async () => {
    await getUserInfoAuth0();
    navigate("/home");
  }, [navigate]);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const regex = /access_token=([^&]+)/;
    const match = regex.exec(hash);
    if (match) {
      const token = match[1];
      localStorage.setItem("token", token);
      getUserInfo();
    }
  }, [getUserInfo]);

  return (
    <RootBox data-testid="sign-in">
      <Typography children={SIGN_IN} variant="h3" />

      <Modal open={loading} onClose={handleClose}>
        <LoaderBox>
          <CircularProgress />
        </LoaderBox>
      </Modal>

      <ContenBox>
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

        <Button variant="contained" onClick={handleSignIn}>
          {SIGN_IN}
        </Button>

        <Button
          variant="contained"
          onClick={handleGoogleSignIn}
          startIcon={<GoogleIcon />}
        >
          {WITH_GOOGLE}
        </Button>

        <StyledTypography
          children={GO_TO + SIGN_UP}
          variant="caption"
          onClick={renderSignUp}
        />
      </ContenBox>
    </RootBox>
  );
};

export default SignIn;
