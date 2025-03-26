import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  name: string | null;
  userId: number | null;
  token: string | null;
  getUserData: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

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

  const getUserData = () => {
    const storedName = sessionStorage.getItem("name") || "?";
    const storedUserId = sessionStorage.getItem("userId");
    const parsedUserId = storedUserId ? Number(storedUserId) : null;
    const storedToken = sessionStorage.getItem("token") || "";
    console.log(parsedUserId);
    
    setName(storedName);
    setUserId(parsedUserId);
    setToken(storedToken);
  };

  useEffect(() => {
    getUserData();
  }, []);

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
