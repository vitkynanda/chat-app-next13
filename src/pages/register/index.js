"use client";

import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/context/authContext";
import { auth, db, facebookProvider, googleProvider } from "@/firebase";
import { profileColors } from "@/profile-colors";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const formData = [
  { name: "displayName", type: "text", placeholder: "User Name" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "password", type: "password", placeholder: "Password" },
];

const Register = () => {
  const { dispatch } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch({ isLoading: true });
    try {
      const [displayName, email, password] = e.target;
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      if (userCred) {
        await setDoc(doc(db, "users", userCred.user.uid), {
          uid: userCred.user.uid,
          displayName: userCred.user.displayName,
          email: userCred.user.email,
          color:
            profileColors[Math.floor(Math.random() * profileColors.length)],
        });
        await setDoc(doc(db, "userChats", userCred.user.id));
        await updateProfile(auth.currentUser, {
          displayName: displayName.value,
        });
        toast.success("User logged in successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
    dispatch({ isLoading: false });
  };

  const handleSignUpGoogle = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      if (userCred) {
        await setDoc(doc(db, "users", userCred.user.uid), {
          uid: userCred.user.uid,
          displayName: userCred.user.displayName,
          email: userCred.user.email,
          color: `${
            profileColors[Math.floor(Math.random() * profileColors.length)]
          }`,
        });
        await setDoc(doc(db, "userChats", userCred.user.uid), {});
        toast.success("User logged in successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSignUpFacebook = async () => {
    try {
      const userCred = await signInWithPopup(auth, facebookProvider);
      if (userCred) {
        await setDoc(doc(db, "users", userCred.user.uid), {
          uid: userCred.user.uid,
          displayName: userCred.user.displayName,
          email: userCred.user.email,
          color: `${
            profileColors[Math.floor(Math.random() * profileColors.length)]
          }`,
        });
        await setDoc(doc(db, "userChats", userCred.user.id));
        await updateProfile(auth.currentUser, {
          displayName: displayName.value,
        });
        toast.success("User logged in successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthLayout
      title="Create a new Account"
      subtitle="Connect and chat everyone everywhere"
      googleAction={handleSignUpGoogle}
      facebookAction={handleSignUpFacebook}
    >
      <AuthForm
        withForget
        onSubmit={handleSignUp}
        formData={formData}
        buttonText="Sign Up"
        bottomText="Already have account ?"
        linkProps={{ text: "Login Now", href: "/login" }}
      />
    </AuthLayout>
  );
};

export default Register;
