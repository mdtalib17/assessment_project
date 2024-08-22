import { Children, createContext, FC, useEffect, useState } from "react";
import { ApiService } from "./ApiService";

export interface ContextProps {
  users: string[];
  footerInfo: string;
}

export const Context = createContext<ContextProps>({} as ContextProps);

export const ContextProviderComponent: FC = ({ children }) => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    ApiService.getUsers().then(setUsers);
  }, []);

  return (
    <Context.Provider value={{ users, footerInfo: "Copyright 2021" }}>
      {children}
    </Context.Provider>
  );
};
