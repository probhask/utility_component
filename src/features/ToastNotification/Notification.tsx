import React from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillInfoCircle,
  AiFillWarning,
  AiOutlineClose,
} from "react-icons/ai";
import { Toast_Position, TOAST_PROPERTIES } from "types/toast";
import styles from "./Notification.module.scss";

type Props = {
  position?: Toast_Position;
  toastList: TOAST_PROPERTIES[];
  removeToast: (id: string) => void;
};

const TOAST_TYPE_DATA: {
  [name: string]: { icon: JSX.Element; text: string; bg: string };
} = {
  success: {
    icon: <AiFillCheckCircle />,
    text: "success",
    bg: "#16A34A",
  },
  error: {
    icon: <AiFillCloseCircle />,
    text: "error",
    bg: "#DC2626",
  },
  info: {
    icon: <AiFillInfoCircle />,
    text: "info",
    bg: "#3B82F6",
  },
  warn: {
    icon: <AiFillWarning />,
    text: "warn",
    bg: "#EAB308",
  },
};

export const ToastNotification = React.memo(
  ({ position = "top-center", removeToast, toastList }: Props) => {
    return (
      <div
        className={`${styles["notification-container"]} ${styles[position]}`}
      >
        {toastList.map((toast) => (
          <div
            key={toast.id}
            className={`${styles["notification"]}  ${styles[toast.type]}  `}
          >
            <span>{TOAST_TYPE_DATA[toast.type].icon}</span>
            <span> {toast.message || TOAST_TYPE_DATA[toast.type].text}</span>
            <span onClick={() => removeToast(toast.id)}>
              <AiOutlineClose />
            </span>
          </div>
        ))}
      </div>
    );
  }
);
ToastNotification.displayName = "ToastNotification";
export default ToastNotification;
