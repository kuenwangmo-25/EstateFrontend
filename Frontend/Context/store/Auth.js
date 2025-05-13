import React, { useReducer, useEffect, useState, useMemo } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthReducer from "../reducer/auth.reducer";
import { setCurrentUser } from "../actions/auth.actions";
import AuthGlobal from "./AuthGlobal";

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        if (token) {
          const decoded = jwt_decode(token);
          dispatch(setCurrentUser(decoded));
        } else {
          dispatch(setCurrentUser(null));
        }
      } catch (error) {
        console.error("Failed to load token:", error);
        dispatch(setCurrentUser(null));
      } finally {
        setShowChild(true);
      }
    };

    checkToken();

    return () => setShowChild(false);
  }, []);

  // ✅ Memoize the context value to avoid re-renders
  const contextValue = useMemo(() => ({ stateUser, dispatch }), [stateUser]);

  if (!showChild) {
    return null;
  }

  return (
    <AuthGlobal.Provider value={contextValue}>
      {props.children}
    </AuthGlobal.Provider>
  );
};

export default Auth;
