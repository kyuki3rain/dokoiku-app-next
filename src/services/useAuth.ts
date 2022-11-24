import { useCallback, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signInWithCredential,
  signOut,
  Auth,
} from "@firebase/auth";

export const provider = new GoogleAuthProvider();

export const useAuth = (auth: Auth) => {
  const [state, setState] = useState<
    "idel" | "progress" | "logined" | "logouted" | "error"
  >("idel");
  const [error, setError] = useState<unknown>("");
  const [credential, setCredential] = useState<UserCredential>();
  const dispatch = useCallback(
    (
      action:
        | { type: "login"; payload?: { token: string } }
        | { type: "logout" }
    ) => {
      setError("");
      switch (action.type) {
        case "login":
          setState("progress");
          const token = action.payload?.token;
          if (token) {
            signInWithCredential(auth, GoogleAuthProvider.credential(token))
              .then((result) => {
                setCredential(result);
                setState("logined");
              })
              .catch((e) => {
                setError(e);
                setState("error");
              });
          } else {
            signInWithPopup(auth, provider)
              .then((result) => {
                setCredential(result);
                setState("logined");
              })
              .catch((e) => {
                setError(e);
                setState("error");
              });
          }
          break;
        case "logout":
          setState("progress");
          signOut(auth)
            .then(() => {
              setCredential(undefined);
              setState("logouted");
            })
            .catch((e) => {
              setError(e);
              setState("error");
            });
          break;
      }
    },
    [auth]
  );
  return { state, error, credential, dispatch };
};
