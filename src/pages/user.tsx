import { useAuth } from "@src/services/useAuth";
import type { NextPage } from "next";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { getApp } from "firebase/app";
import { useEffect } from "react";

const Page: NextPage = () => {
  const { state, dispatch, credential, error } = useAuth(getAuth(getApp()));
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch({ type: "login", payload: { token } });
    }
  }, [dispatch]);

  useEffect(() => {
    if (credential) {
      const token =
        GoogleAuthProvider.credentialFromResult(credential)?.idToken;
      token && sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [credential]);

  const handleLogin = () => dispatch({ type: "login" });
  const handleLogout = () => dispatch({ type: "logout" });

  return (
    <div>
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleLogout}>ログアウト</button>
      <div>User: {credential?.user.displayName}</div>
      <div>State: {state}</div>
      <div>Error: {String(error)}</div>
    </div>
  );
};

export default Page;
