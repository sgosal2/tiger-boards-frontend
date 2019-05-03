import React, { useEffect, useState } from "react";
import useDataApi from "../../utilities/use-data-api";
import config from "../../config.json";
import {
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  Typography
} from "@material-ui/core";

let axiosReqBody;

export const AddSystemAdminForm = () => {
  const [emailToAdd, setEmailToAdd] = useState("");
  const addAdminApi = useDataApi({});

  useEffect(() => addAdminApi.doFetch(axiosReqBody), [axiosReqBody]);

  const addSystemAdmin = admin => {
    axiosReqBody = {
      method: "post",
      url: `${config.API_ADMINS}`,
      data: {
        email: admin
      }
    };
    setEmailToAdd("");
  };

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
          value={emailToAdd}
          onChange={e => setEmailToAdd(e.target.value)}
        />
        {addAdminApi.isLoading ? (
          <CircularProgress />
        ) : (
          <Button
            color="primary"
            id="addSystemAdminSubmitButton"
            onClick={() => addSystemAdmin(emailToAdd)}
          >
            Add
          </Button>
        )}
      </FormControl>
    </div>
  );
};

export default AddSystemAdminForm;
