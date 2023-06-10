import React from "react";

const InputForm = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full h-14 bg-c5 text-c3 outline-none border-none rounded-xl px-5"
    />
  );
};

export default InputForm;
