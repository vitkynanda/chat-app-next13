"use client";

import React from "react";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io";
import AuthButton from "./AuthButton";
import { useAuth } from "@/context/authContext";

const AuthLayout = ({
  title,
  subtitle,
  children,
  googleAction,
  facebookAction,
}) => {
  const { authLoading } = useAuth();
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-c1">
      <div className="flex flex-col items-center">
        <div className="text-center">
          <p className="md:text-4xl text-3xl font-bold">{title}</p>
          <p className="mt-3">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 w-full md:mt-10 mt-5 mb-5">
          <AuthButton
            onClick={googleAction}
            title="With Google"
            loading={authLoading}
            icon={<IoLogoGoogle size={24} />}
          />
          <AuthButton
            onClick={facebookAction}
            title="With Facebook"
            loading={authLoading}
            icon={<IoLogoFacebook size={24} />}
          />
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-5 h-[1px] bg-c3"></span>
          <span className="w-5">OR</span>
          <span className="w-5 h-[1px] bg-c3"></span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
