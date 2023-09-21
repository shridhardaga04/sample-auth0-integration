import {
  AUTH0_DB_CONNECTION,
  AUTH0_SIGNIN,
  AUTH0_SIGNUP,
  AUTH0_USER_INFO,
} from "./constants";
import axios from "axios";
import { USER } from "./type";

export const signUp = async (user: USER) => {
  let registered = false;
  await axios
    .post(AUTH0_SIGNUP, {
      client_id: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
      email: user.email,
      password: user.password,
      connection: AUTH0_DB_CONNECTION,
      name: user.name,
    })
    .then((res) => {
      if (res.data) {
        registered = true;
      }
    });
  return registered;
};

export const login = async (user: USER) => {
  let isAuthenticated = false;
  await axios
    .post(AUTH0_SIGNIN, {
      grant_type: `${process.env.REACT_APP_AUTH0_GRANT_TYPE}`,
      username: user.email,
      password: user.password,
      audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
      client_id: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
      client_secret: `${process.env.REACT_APP_AUTH0_CLIENT_SECRET}`,
      realm: AUTH0_DB_CONNECTION,
      scope: "openid",
    })
    .then(async (res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.access_token);
        await getUserInfoAuth0();
        isAuthenticated = true;
      }
    })

    .catch(() => {
      window.alert("Wrong email or password.");
    });
  return isAuthenticated;
};

export const getUserInfoAuth0 = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  await axios.get(AUTH0_USER_INFO, config).then((response) => {
    localStorage.setItem("name", response.data.name);
  });
};
