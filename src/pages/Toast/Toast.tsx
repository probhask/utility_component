import useToastNotification from "@features/ToastNotification/hook/useToastNotification";
import { Toast_Position } from "types/toast";
import { useState } from "react";
import style from "./Toast.module.scss";

const Toast = () => {
  const [position, setPosition] = useState<Toast_Position>("top-center");
  const { NotificationComponent, toast } = useToastNotification(position);
  return (
    <div className={style["toast-page-container"]}>
      <NotificationComponent />
      <div className={style["inner-div"]}>
        <h1>Toast Notification</h1>

        {/* toast position */}
        <h3 className="bggr">select position</h3>
        <div>
          <button
            className={`${position === "top-left" && `${style["active-btn"]}`}`}
            onClick={() => setPosition("top-left")}
          >
            top-left
          </button>
          <button
            className={`${
              position === "top-center" && `${style["active-btn"]}`
            }`}
            onClick={() => setPosition("top-center")}
          >
            top-center
          </button>
          <button
            className={`${
              position === "top-right" && `${style["active-btn"]}`
            }`}
            onClick={() => setPosition("top-right")}
          >
            top-right
          </button>
          <button
            className={`${
              position === "bottom-left" && `${style["active-btn"]}`
            }`}
            onClick={() => setPosition("bottom-left")}
          >
            bottom-left
          </button>
          <button
            className={`${
              position === "bottom-center" && `${style["active-btn"]}`
            }`}
            onClick={() => setPosition("bottom-center")}
          >
            bottom-center
          </button>
          <button
            className={`${
              position === "bottom-right" && `${style["active-btn"]}`
            }`}
            onClick={() => setPosition("bottom-right")}
          >
            bottom-right
          </button>
        </div>

        {/* divider */}
        <div />

        <h3>select type</h3>
        {/* toast type */}
        <div>
          <button
            className="bg-gray-100 rounded-md shadow-sm px-3 py-1 active:scale-90 border border-black hover:bg-slate-400 "
            onClick={() => toast.success("process complete")}
          >
            sucess
          </button>
          <button
            className="bg-gray-100 rounded-md shadow-sm px-3 py-1 active:scale-90 border border-black hover:bg-slate-400"
            onClick={() => toast.error("process failed")}
          >
            error
          </button>
          <button
            className="bg-gray-100 rounded-md shadow-sm px-3 py-1 active:scale-90 border border-black hover:bg-slate-400"
            onClick={() => toast.info("process running ")}
          >
            info
          </button>
          <button
            className="bg-gray-100 rounded-md shadow-sm px-3 py-1 active:scale-90 border border-black hover:bg-slate-400"
            onClick={() => toast.warn("file missing")}
          >
            warning
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
