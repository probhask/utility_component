export type Toast_Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type Toast_Type = "success" | "error" | "info" | "warn";

export type TOAST_PROPERTIES = {
  id: string;
  type: Toast_Type;
  message?: string;
  time?: number;
};
