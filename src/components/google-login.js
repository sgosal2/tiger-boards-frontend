import React, { useEffect } from "react";

const GOOGLE_BUTTON_ID = "google-sign-in-button";
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
  const profile = googleUser.getBasicProfile();
  console.log("Email: " + profile.getEmail());
};

export const GoogleLogin = () => {
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

  return <div id={GOOGLE_BUTTON_ID} />;
};

export default GoogleLogin;
