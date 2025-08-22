export const layoutReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_LAYOUT":
      return action.payload;
    case "CLEAR_LAYOUT":
      return action.payload;
    default:
      return state;
  }
};
