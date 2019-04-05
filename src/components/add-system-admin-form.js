import React, { useState } from "react";

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography
} from "@material-ui/core";

let addSystemAdmin = admin => {
  alert(admin);
};

export const AddSystemAdminForm = () => {
  const [emailToAdd, setEmailToAdd] = useState("");
  return (
    <div>
      <Typography variant="h6">Add System Administrator</Typography>
      <FormControl margin="none">
        <InputLabel htmlFor="emailToAddInput">Email</InputLabel>
        <Input
          id="emailToAddInput"
          name="emailToAddInput"
          type="email"
          required
          onChange={e => setEmailToAdd(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          id="addSystemAdminSubmitButton"
        >
          Add
        </Button>
      </FormControl>
    </div>
  );
};

export default AddSystemAdminForm;
