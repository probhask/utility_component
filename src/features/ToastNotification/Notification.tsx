import React from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillInfoCircle,
  AiFillWarning,
  AiOutlineClose,
} from "react-icons/ai";
import { Toast_Position, Toast_Type } from "types/toast";
import styles from "./Notification.module.scss";

type Props = {
  position: Toast_Position;
  type?: Toast_Type;
  msg?: string;
  close: () => void;
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

const Notification = React.memo(
  ({ position = "top-center", type = "info", msg, close }: Props) => {
    return (
      <div
        className={`${styles["notification"]} ${styles[position]} ${styles[type]}  `}
      >
        {/* icon */}
        <span>{TOAST_TYPE_DATA[type].icon}</span>
        <span> {msg || TOAST_TYPE_DATA[type].text}</span>
        <span onClick={close}>
          <AiOutlineClose />
        </span>
      </div>
    );
  }
);
Notification.displayName = "Notification";

export default Notification;
