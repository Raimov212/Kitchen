import { Dispatch, SetStateAction, createContext } from "react";

type LoginContextType = {
  isVisibleRoute: boolean;
  setIsVisibleRoute: Dispatch<SetStateAction<boolean>>;
};

export const LoginContext = createContext<LoginContextType | boolean>(false);
