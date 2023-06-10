"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from "react";

const reducer = (state, newState) => ({ ...state, ...newState });

const initialState = {
  currentUser: null,
  isLoading: false,
};

const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [{ currentUser, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ isLoading: true });
      if (user) {
        dispatch({ currentUser: user, isLoading: false });
      } else {
        dispatch(initialState);
        router.push("/login");
      }
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        authLoading: isLoading,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
