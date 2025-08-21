export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return action.payload;
    case "CLEAR_AUTH":
      return action.payload;

    default:
      return state;
  }
};
