export const socketReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SOCKET":
      return action.payload;
    case "CLEAR_SOCKET":
      return action.payload;
    default:
      return state;
  }
};
