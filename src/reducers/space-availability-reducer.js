const spaceAvailabilityReducer = (state, action) => {
  switch (action.type) {
    case "change-building":
      return { ...state, building: action.value };
    case "change-datetime":
      return { ...state, datetime: action.value };
    case "change-data":
      return { ...state, data: action.value };
    default:
      return state;
  }
};

export default spaceAvailabilityReducer;
