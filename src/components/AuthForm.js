import React from "react";
import InputForm from "./InputForm";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useAuth } from "@/context/authContext";

const AuthForm = ({
  formData,
  withForget,
  buttonText,
  bottomText,
  linkProps: { text, href },
  onSubmit,
}) => {
  const { authLoading } = useAuth();
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 w-full md:w-[500px] mt-5"
    >
      {formData.map(({ name, type, placeholder }) => (
        <InputForm
          key={name}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
        />
      ))}

      {withForget && (
        <div className="text-right w-full text-c3">
          <span>Forgot Password ?</span>
        </div>
      )}

      <button className="flex items-center justify-center gap-2 mt-4 w-full outline-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl h-14">
        {authLoading && (
          <ClipLoader color="#ffffff" size={20} aria-label="Loading Spinner" />
        )}{" "}
        <span>{buttonText}</span>
      </button>

      <div className="flex items-center justify-center gap-1">
        <span>{bottomText}</span>
        <Link
          href={href}
          className="font-semibold text-white underline underline-offset-2 cursor-pointer"
        >
          {text}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
