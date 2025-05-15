import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

//constants
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
  fetch(`${baseURL}/login`, {
    method: "POST",
    body: JSON.stringify(user), // convert an object or value to a JSONstring representation.
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res.status)
      if (res.status === 200) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Login Succeeded",
          text2: "",
        });
        return res.json();
      } else {
        throw new Error("Login unsuccessful");
      }
    }) //parse the response received from an HTTPrequest as JSON.
    .then((data) => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("jwt", token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded, user));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      console.log("error", err);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
        text2: "",
      });
      logoutUser(dispatch);
    });
};
export const getUserProfile = (id) => {
  fetch(`${baseURL}/${id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const logoutUser = (dispatch) => {
  AsyncStorage.getItem("jwt")
    .then((token) => {
      // Optional: Call your logout API
      return axios.post(
        `${baseURL}/logout`, // adjust to your real endpoint
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    })
    .catch((error) => {
      console.warn("Logout API failed (maybe optional):", error.message);
    })
    .finally(() => {
      // Clear token and update state
      AsyncStorage.removeItem("jwt")
        .then(() => {
          dispatch(setCurrentUser({}));

          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Logout Successful",
            text2: "",
          });
        })
        .catch((err) => {
          console.error("Error clearing AsyncStorage:", err);
        });
    });
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};

