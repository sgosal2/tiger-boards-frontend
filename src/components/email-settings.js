import React, { useState } from "react";
import { Button, Checkbox, FormControl, Typography } from "@material-ui/core";

const updateEmailSettings = (emailDaily, emailWeekly) => {
  alert(emailDaily);
  alert(emailWeekly);
};

export const EmailSettings = userEmail => {
  const [emailDaily, setEmailDaily] = useState(false);
  const [emailWeekly, setEmailWeekly] = useState(false);

  return (
    <div>
      <Typography variant="h6">Email Preferences</Typography>
      <FormControl margin="none">
        <Typography variant="body1">Email daily</Typography>
        <Checkbox
          id="emailDaily"
          onChange={e => setEmailDaily(e.target.checked)}
        />
        <Typography variant="body1">Email weekly</Typography>
        <Checkbox
          id="emailWeekly"
          onChange={e => setEmailWeekly(e.target.checked)}
        />
        <Button
          color="primary"
          id="updateEmailPreferences"
          onClick={(emailDaily, emailWeekly) =>
            updateEmailSettings(emailDaily, emailWeekly)
          }
        >
          Update email preferences
        </Button>
      </FormControl>
    </div>
  );
};

export default EmailSettings;
