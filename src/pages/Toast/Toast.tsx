import { Toast_Position, Toast_Type } from "types/toast";
import { useState } from "react";
import style from "./Toast.module.scss";
import useToast from "@components/ToastNotification/hook/useToast";

const position_buttons: Toast_Position[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
const type_buttons: Set<Toast_Type> = new Set([
  "success",
  "error",
  "info",
  "warn",
]);
const Toast = () => {
  const [position, setPosition] = useState<Toast_Position>("top-center");
  const { ToastComponent, ToastFunc: TriggerToast } = useToast();

  const addToast = (type: Toast_Type) => {
    switch (type) {
      case "success":
        TriggerToast.success("task successful");
        break;
      case "error":
        TriggerToast.error("task failed");
        break;
      case "info":
        TriggerToast.info("task running in background");
        break;
      case "warn":
        TriggerToast.warn("don't close before installing");
        break;
      default:
    }
  };
  return (
    <div className={style["toast-page-container"]}>
      <ToastComponent position={position} />
      <div className={style["inner-div"]}>
        <h1>Toast Notification</h1>

        {/* toast position */}
        <h3>select position</h3>
        <div>
          {position_buttons.map((btn) => (
            <button
              key={btn}
              className={`${position === btn ? style["active-btn"] : ""}`}
              onClick={() => setPosition(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* divider */}
        <div />

        {/* toast type */}
        <h3>select type</h3>
        <div>
          {Array.from(type_buttons).map((btn) => (
            <button key={btn} onClick={() => addToast(btn)}>
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toast;
