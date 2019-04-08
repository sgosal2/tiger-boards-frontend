const adminViewReducer = (state, action) => {
  console.log(
    "Admin View Reducer -- Type: ",
    action.type,
    " Value: ",
    action.value
  );
  switch (action.type) {
    case "change-currbuildingid":
      return { ...state, currBuildingID: action.value };
    case "change-curreventid":
      return { ...state, currEventID: action.value };
    case "change-currspace":
      return { ...state, currSpaceID: action.value };
    default:
      return state;
  }
};

export default adminViewReducer;
