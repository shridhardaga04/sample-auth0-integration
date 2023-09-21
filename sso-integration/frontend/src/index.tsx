import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { REDIRECT_URL } from "./components/utils/constants";

const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const cilentId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Auth0Provider
    domain={domain}
    clientId={cilentId}
    authorizationParams={{
      redirect_uri: REDIRECT_URL,
    }}
  >
    <App />
  </Auth0Provider>
);
