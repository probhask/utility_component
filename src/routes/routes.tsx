import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
const App = lazy(() => import("../App"));
const Toast = lazy(() => import("@pages/Toast/Toast"));
const Home = lazy(() => import("@pages/Home/Home"));
const NestedFileStructure = lazy(
  () => import("@pages/NestedFileStructure/NestedFileStructure")
);
import ErrorElement from "@components/ErrorElement/ErrorElement";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "toast",
        element: (
          <Suspense>
            <Toast />
          </Suspense>
        ),
      },
      {
        path: "nested-file",
        element: (
          <Suspense>
            <NestedFileStructure />
          </Suspense>
        ),
      },
      { path: "*", element: <ErrorElement /> },
    ],
  },
]);

export default routes;
