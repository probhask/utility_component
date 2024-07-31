import { useCallback, useRef, useState } from "react";
import Notification from "../Notification";
import { Toast_Position, Toast_Type } from "types/toast";

const useToastNotification = (position: Toast_Position) => {
  const [notificationData, setNotificationData] = useState<{
    type: Toast_Type;
    message?: string;
    time?: number;
  } | null>(null);

  // let timer: NodeJS.Timeout;
  const timeRef = useRef<NodeJS.Timeout>();

  const triggerToast = useCallback(
    (type: Toast_Type, message?: string, time?: number) => {
      clearTimeout(timeRef.current);
      setNotificationData({ type, message, time });
      timeRef.current = setTimeout(() => {
        setNotificationData(null);
      }, time || 3000);
    },
    []
  );

  const close = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      setNotificationData(null);
    }
  };

  const NotificationComponent = () => {
    return notificationData ? (
      <Notification
        position={position}
        type={notificationData?.type}
        msg={notificationData?.message}
        close={close}
      />
    ) : null;
  };

  const toast = {
    success: (message?: string, time?: number) =>
      triggerToast("success", message, time),
    error: (message?: string, time?: number) =>
      triggerToast("error", message, time),
    info: (message?: string, time?: number) =>
      triggerToast("info", message, time),
    warn: (message?: string, time?: number) =>
      triggerToast("warn", message, time),
  };

  return { NotificationComponent, toast };
};

export default useToastNotification;
