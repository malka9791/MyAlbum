import { createContext, ReactElement, useState } from "react";

type LoginContextType = {
  mail: string | null;
  SetEmail: (mail: string) => void;
  password: string | null;
  SetPassword: (password: string) => void;
};
const LoginContext = createContext<LoginContextType | undefined>(undefined);
export const LoginProvider = ({ children }: { children: ReactElement }) => {
  const [mail, SetEmail] = useState<String>("");
  const [password, SetPassword] = useState<String>("");
  return (
    <LoginProvider.Provider value={{ mail, SetEmail, password, SetPassword }}>
      {children}
    </LoginProvider.Provider>
  );
};
