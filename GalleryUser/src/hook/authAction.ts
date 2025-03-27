import axios from "axios";
import { Dispatch } from "react";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const GET_USERDATA = "GET_USERDATA";
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // role:string;
}
// interface Login{
//   name:string,
// }
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { user: User; token: string | null };
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: { user: string; token: string | null };
}
// interface GetUserData{
//   type:typeof GET_USERDATA;
//   payload:{name:string|null;userId:number|undefined;token:string|null;};
// }

export type AuthActionTypes = LoginSuccessAction | LoginFailAction;

export const registerUser =
  (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role:string;
  }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    
    console.log(userData);
    try {
      const res = await axios.post(
        "http://localhost:5028/api/auth/signup",
        userData
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: userData, token: res.data.token },
      });
      console.log(res.data.token);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("name", res.data.user.firstName);
      sessionStorage.setItem("userId", res.data.user.userId);
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
export const login =
  (userData: { email: string; password: string }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    console.log(userData);
    try {
      const res = await axios.post(
        "http://localhost:5028/api/auth/login",
        userData
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: res.data.user, token: res.data.token },
      });
      console.log("in login act", res.data);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("name", res.data.user.firstName);
      sessionStorage.setItem("userId", res.data.user.id);
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
// export const getUserData =
// (
// ) =>
//  (dispatch: Dispatch<GetUserData>) => {

//     const name = sessionStorage.getItem("name");
//      name ? (JSON.parse(name) as string) : "?";
//      const userId = sessionStorage.getItem("userId");
//      const parsedUserId = userId ? Number(userId) : undefined;
//      const token = sessionStorage.getItem("token");
//      token ? (JSON.parse(token) as string) : "";
//      dispatch({
//       type: GET_USERDATA,
//       payload: { name: name,userId:parsedUserId, token: token },
//     });
// };
