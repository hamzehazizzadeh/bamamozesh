export const metaReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_META":
      return action.payload;
    case "CLEAR_META":
      return action.payload;
    default:
      return state;
  }
};
