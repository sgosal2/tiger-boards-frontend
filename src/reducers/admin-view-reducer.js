const adminViewReducer = (state, action) => {
  console.log(
    "Admin View Reducer -- Type: ",
    action.type,
    " Value: ",
    action.value
  );
  switch (action.type) {
    case "change-curreventid":
      return { ...state, currEventID: action.value };
    case "change-curr-building-data":
      return { ...state, currBuildingData: action.value };
    case "change-curr-event-data":
      return { ...state, currEventData: action.value };
    case "change-curr-space-data":
      return { ...state, currSpaceData: action.value };
    case "change-buildings-data":
      return { ...state, buildingsData: action.value };
    case "change-spaces-data":
      return { ...state, spacesData: action.value };
    case "change-events-data":
      return { ...state, eventsData: action.value };
    case "reset-data":
      return {
        ...state,
        currSpaceData: {},
        currEventData: {},
        currBuildingData: {}
      };
    default:
      return state;
  }
};

export default adminViewReducer;
