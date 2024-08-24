import React from "react";
import { Link } from "react-router-dom";

const ErrorElement = React.memo(() => {
  return (
    <div className="w-screen h-screen flex justify-center items-start py-20 bg-white">
      <div className="w-full flex flex-col items-center ">
        <h2 className="font-bold text-4xl md:text7xl mb-4 text-neutral-950">
          Page Not Found
        </h2>
        <Link
          to={"/"}
          className="bg-neutral-600 px-4 rounded-md py-2 text-lg text-[#F7EFE5]"
        >
          Go Back To HomePage
        </Link>
      </div>
    </div>
  );
});
ErrorElement.displayName = "ErrorElement";

export default ErrorElement;
