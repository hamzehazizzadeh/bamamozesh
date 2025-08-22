import { combineReducers } from "redux";

import { loaderReducer } from "./loaderReducer/loaderReducer";
import { authReducer } from "./authReducer/authReducer";
import { userReducer } from "./userReducer/userReducer";
import { metaReducer } from "./metaReducer/metaReducer";
import { permissionsReducer } from "./permissionsReducer/permissionsReducer";
import { socketReducer } from "./socketReducer/socketReducer";
import { titleReducer } from "./titleReducer/titleReducer";
import { layoutReducer } from "./layoutReducer/layoutReducer";

export const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  title: titleReducer,
  loader: loaderReducer,
  permissions: permissionsReducer,
  meta: metaReducer,
  socket: socketReducer,
  layout: layoutReducer,
});
