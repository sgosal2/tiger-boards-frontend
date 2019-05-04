import React, { useContext, useEffect } from "react";
import { Button } from "@material-ui/core";
import { UserContext } from "../App";
import useDataApi from "../utilities/use-data-api";
import config from "../config.json";

const GOOGLE_BUTTON_ID = "google-sign-in-button";
let googleUserObj;

export const GoogleLogin = () => {
  const loginApi = useDataApi({});
  const user = useContext(UserContext);

  const renderLoginButton = () => {
    window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
      width: 90,
      height: 30,
      scope: "email",
      onsuccess: onSuccess
    });
  };

  const onSuccess = googleUser => {
    googleUserObj = googleUser;
    const profile = googleUserObj.getBasicProfile();
    const userEmail = profile.getEmail();
    user.changeUserEmail(userEmail);
    loginApi.doFetch({
      method: "post",
      url: `${config.API_JWT}`,
      data: {
        email: userEmail
      }
    });
  };

  const logOut = () => {
    googleUserObj.disconnect().then(() => {
      googleUserObj = null;
      user.changeUserEmail(null);
      user.changeAdminStatus(false);
    });
  };

  useEffect(() => {
    try {
      renderLoginButton();
    } catch (e) {
      // This handles case of window.gapi in line 6 sometimes being undefined
      // due to Google Oauth CDN not loading before component renders
      if (e instanceof TypeError) {
        setTimeout(() => renderLoginButton(), 2000);
      }
    }
  });

  useEffect(() => {
    user.changeAdminStatus(loginApi.data.is_admin);
  }, [loginApi.data]);

  console.log(loginApi.data);
  if (user.email == null) {
    return <div id={GOOGLE_BUTTON_ID} />;
  } else {
    return (
      <Button onClick={() => logOut()} color="inherit">
        Log Out
      </Button>
    );
  }
};

export default GoogleLogin;
