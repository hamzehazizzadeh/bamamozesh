export const permissionsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_PERMISSIONS":
      return action.payload;
    case "CLEAR_PERMISSIONS":
      return {};

    default:
      return state;
  }
};
