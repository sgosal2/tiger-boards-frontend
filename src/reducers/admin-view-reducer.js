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
    case "change-currspaceid":
      return { ...state, currSpaceID: action.value };
    case "change-buildings-data":
      return { ...state, buildingsData: action.value };
    case "change-spaces-data":
      return { ...state, spacesData: action.value };
    case "change-events-data":
      return { ...state, eventsData: action.value };
    default:
      return state;
  }
};

export default adminViewReducer;
