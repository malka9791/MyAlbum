import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  name: string | null;
  SetName: (name: string) => void;
  userId: number | null;
  SetUserId: (userId: number) => void;
};
export const UserContext = createContext<UserContextType>({
  name:"",
  SetName:(_:string)=>{},
  userId:-1,
  SetUserId:(_:number)=>{}
});

function UserProvider ({ children }: { children: ReactNode })  {
  const [name, SetName] = useState<string>("");
  const [userId, SetUserId] = useState<number>(0);
  return (
    <UserContext.Provider value={{ name, SetName, userId, SetUserId }}>
      {children}
    </UserContext.Provider>
  );

};

export default UserProvider;
