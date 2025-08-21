import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { playNotificationSound } from "../../utils";
import { notificationMessage } from "../../utils/toastMessage/toastMessage";
import { setMetaAction } from "../../redux/actions/metaActions/metaActions";

const NotificationListener = () => {
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.socket);

  const showNotification = (item) => {
    dispatch(setMetaAction());

    const text = item.description;
    playNotificationSound(item.type);

    notificationMessage(text, item.type);
  };

  useEffect(() => {
    if (!isEmpty(socket)) {
      socket.on("new-notification", showNotification);

      return () => {
        socket.off("new-notification", showNotification);
      };
    }
  }, [socket]);

  return null;
};

export default NotificationListener;
