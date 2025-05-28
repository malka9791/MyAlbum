import { createContext, ReactNode, useEffect, useState } from "react";

type UserContextType = {
  name: string | null;
  userId: number | null;
  token: string | null;
  // isLogin: string | null;
  getUserData: () => void;
};

export const UserContext = createContext<UserContextType>({
  name: "?",
  userId: null,
  token: "",
  // isLogin: null,
  getUserData: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string | null>(
    sessionStorage.getItem("name") || "?"
  );
  const [userId, setUserId] = useState<number | null>(
    sessionStorage.getItem("userId")
      ? Number(sessionStorage.getItem("userId"))
      : null
  );
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("token") || ""
  );
  // const [isLogin, setIsLogin] = useState<string | null>(
  //   sessionStorage.getItem("isLogin") || null
  // );

  const getUserData = () => {
    const storedName = sessionStorage.getItem("name") || "?";
    const storedUserId = sessionStorage.getItem("userId");
    const parsedUserId = storedUserId ? Number(storedUserId) : null;
    const storedToken = sessionStorage.getItem("token") || "";
    // const storeIsLogin = sessionStorage.getItem("isLogin") || null;

    // setIsLogin(storeIsLogin);
    setName(storedName);
    setUserId(parsedUserId);
    setToken(storedToken);
  };
  const updateSessionData = () => {
    getUserData();
    // עדכון נתונים
  };
  useEffect(() => {
    window.addEventListener("sessionUpdated", updateSessionData);

    return () => {
      window.removeEventListener("sessionUpdated", updateSessionData);
    };
  }, []); // רק כשהקומפוננטה נטענת

  return (
    <UserContext.Provider value={{ name, userId, token, getUserData }}>
      {children}
    </UserContext.Provider>
  );
}

// export function useUser() {
//   const context = useContext(UserContext);
//   if (!context) throw new Error("useUser must be used within a UserProvider");
//   return context;
// }
