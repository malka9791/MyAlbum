import axios from "axios";
import { Dispatch } from "react";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const GET_USERDATA = "GET_USERDATA";
const api = import.meta.env.VITE_API_URL;
interface UserRes {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { user: UserRes; token: string | null };
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: { user: string; token: string | null };
}

export type AuthActionTypes = LoginSuccessAction | LoginFailAction;
//sign up
export const registerUser =
  (userData: {
    fullName: string;
    email: string;
    password: string;
    // role: string;
  }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const res = await axios.post(`${api}/auth/signup`, userData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: res.data.user, token: res.data.token },
      });
      sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("name", res.data.user.fullName);
      sessionStorage.setItem("userId", res.data.user.id);
      window.dispatchEvent(new CustomEvent("sessionUpdated"));
      // sessionStorage.set()
      return res.data;
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: { user: "error in data or connect to server", token: "" },
      });
      return { token: null };
    }
  };
//login
export const login =
  (userData: { email: string; password: string }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const res = await axios.post(`${api}/auth/login`, userData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: res.data.user, token: res.data.token },
      });
      // sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("name", res.data.user.fullName);
      sessionStorage.setItem("userId", res.data.user.id);
      window.dispatchEvent(new CustomEvent("sessionUpdated"));

      return res.data;
    } catch (error: any) {
      let resError: string = "";
      if (error.response?.status == 401) {
        resError = error.response.data;
      } else {
        resError = "Something went wrong. Please try again.";
      }
      dispatch({
        type: LOGIN_FAIL,
        payload: { user: resError, token: "" },
      });
      return { errorRes: resError, token: null };
    }
  };
  export const logout = () => (dispatch: Dispatch<AuthActionTypes>) => {
    // מנקה את ה־sessionStorage
    sessionStorage.clear();
    window.dispatchEvent(new CustomEvent("sessionUpdated"));
    // שולח action ל־reducer לאפס את ה־user
    dispatch({
      type: LOGIN_FAIL,
      payload: { user: "", token: null },
    });
  };
  
