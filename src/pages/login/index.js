"use client";

import React from "react";
import AuthLayout from "@/components/AuthLayout";
import AuthForm from "@/components/AuthForm";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "@/firebase";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const formData = [
  { name: "email", type: "email", placeholder: "Email" },
  { name: "password", type: "password", placeholder: "Password" },
];

const Login = () => {
  const router = useRouter();
  const { dispatch } = useAuth();
  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch({ isLoading: true });
    try {
      const [email, password] = e.target;
      const userCred = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      if (userCred) {
        toast.success("User logged in successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
    dispatch({ isLoading: false });
  };

  const handleSignInGoogle = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      if (userCred) {
        toast.success("User logged in successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSignInFacebook = async () => {
    try {
      const userCred = await signInWithPopup(auth, facebookProvider);
      if (userCred) {
        toast.success("User logged in successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthLayout
      title="Login to Your Account"
      subtitle="Connect and chat everyone everywhere"
      googleAction={handleSignInGoogle}
      facebookAction={handleSignInFacebook}
    >
      <AuthForm
        onSubmit={handleSignIn}
        withForget
        formData={formData}
        buttonText="Sign In"
        bottomText="Not a member yet ?"
        linkProps={{ text: "Register Now", href: "/register" }}
      />
    </AuthLayout>
  );
};

export default Login;
