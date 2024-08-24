import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "@routes/routes.tsx";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import { BiLoaderCircle } from "react-icons/bi";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="w-screen h-screen flex justify-center items-center">
          <BiLoaderCircle className="size-10 md:size-20 animate-spin text-black duration-75 ease-in" />
        </div>
      }
    >
      <ErrorBoundary>
        <RouterProvider router={routes} />
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>
);
