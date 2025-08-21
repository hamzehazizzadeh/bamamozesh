import { isEmpty } from "lodash";
import { io } from "socket.io-client";

import { hostname } from "./../../../services/configServices/config";

export const setSocketActions = (accessToken) => {
  return async (dispatch) => {
    const socket = io(hostname, {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 3000,
      timeout: 20000,
    });

    socket.on("connect", () => {
      socket.emit("connect-user", accessToken);
    });

    socket.on("reconnect", () => {
      socket.emit("connect-user", accessToken);
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    await dispatch({ type: "SET_SOCKET", payload: socket });
  };
};

export const clearSocketActions = () => {
  return async (dispatch, getStates) => {
    const states = getStates();
    const socket = states?.socket;

    if (!isEmpty(socket)) {
      socket?.emit("close-user", states?.auth?.accessToken);
      socket?.disconnect();
    }

    await dispatch({ type: "CLEAR_SOCKET", payload: {} });
  };
};
