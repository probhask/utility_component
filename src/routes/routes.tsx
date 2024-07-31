import Modal from "@pages/Modal";
import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/Home/Home";
import App from "../App";
import Toast from "@pages/Toast/Toast";
import NestedFileStructure from "@pages/NestedFileStructure/NestedFileStructure";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "toast", element: <Toast /> },
      { path: "nested-file", element: <NestedFileStructure /> },
      { path: "modals", element: <Modal /> },
    ],
  },
]);

export default routes;
