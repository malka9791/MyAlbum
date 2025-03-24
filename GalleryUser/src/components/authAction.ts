import axios from "axios";
import { Dispatch } from "react";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { user: User; token: string | null };
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: { user: string; token: string | null };
}
export type AuthActionTypes = LoginSuccessAction | LoginFailAction;

export const registerUser =
  (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const res = await axios.post("https://localhost:7177/swagger/index.html/api/auth/signup", userData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {user:userData,
         token:res.data.token,}
         
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:{ user:"error in data or connect to server",
        token: ""},
      });
    }
  };
