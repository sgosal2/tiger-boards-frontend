import React, { useContext, useEffect } from "react";
import { Button } from "@material-ui/core";
import { UserContext } from "../App";

const GOOGLE_BUTTON_ID = "google-sign-in-button";
let googleUserObj;

export const GoogleLogin = () => {
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
    // Make API call here for JWT
    googleUserObj = googleUser;
    const profile = googleUserObj.getBasicProfile();
    user.changeUserEmail(profile.getEmail());
  };

  const logOut = () => {
    googleUserObj.disconnect().then(() => {
      googleUserObj = null;
      user.changeUserEmail(null);
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
