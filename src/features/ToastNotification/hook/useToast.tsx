import { useEffect, useState } from "react";
import { ToastNotification } from "../Notification";
import { Toast_Position, TOAST_PROPERTIES, Toast_Type } from "types/toast";
import { v4 as uuidv4 } from "uuid";

const useToast = () => {
  const [toastList, setToastList] = useState<TOAST_PROPERTIES[]>([]);
  const triggerToast = (type: Toast_Type, message?: string, time?: number) => {
    setToastList([...toastList, { id: uuidv4(), type, message, time }]);
  };

  const removeToast = (id: string) => {
    setToastList((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        removeToast(toastList[0].id);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [toastList]);

  const ToastFunc = {
    success: (message?: string, time?: number) =>
      triggerToast("success", message, time),
    error: (message?: string, time?: number) =>
      triggerToast("error", message, time),
    info: (message?: string, time?: number) =>
      triggerToast("info", message, time),
    warn: (message?: string, time?: number) =>
      triggerToast("warn", message, time),
  };
  const ToastComponent = ({ position }: { position: Toast_Position }) => {
    return (
      <ToastNotification
        position={position}
        toastList={toastList}
        removeToast={removeToast}
      />
    );
  };

  return { ToastFunc, ToastComponent };
};

export default useToast;
