import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

const GOOGLE_BUTTON_ID = "google-sign-in-button";
let googleUserObj;

export const GoogleLogin = ({ loggedIn, changeLoggedIn }) => {
  // const [loggedIn, changeLoggedIn] = useState(false);

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
    console.log("Email: " + profile.getEmail());
    changeLoggedIn(true);
  };

  const logOut = () => {
    googleUserObj.disconnect().then(() => {
      googleUserObj = null;
      changeLoggedIn(false);
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

  if (!loggedIn) {
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
