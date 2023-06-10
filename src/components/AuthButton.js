import React from "react";
import { ClipLoader } from "react-spinners";

const AuthButton = ({ title, icon, loading, ...props }) => {
  return (
    <button
      {...props}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md p-[1px] cursor-pointer"
    >
      <span className="bg-c1 font-semibold gap-1 w-full h-full rounded-md flex items-center justify-center">
        {loading ? (
          <ClipLoader color="#ffffff" size={20} aria-label="Loading Spinner" />
        ) : (
          icon
        )}
        <span>{title}</span>
      </span>
    </button>
  );
};

export default AuthButton;
