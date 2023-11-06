import { Dispatch, SetStateAction, createContext } from "react";

type LoginContextType = {
  isVisibleRoute: boolean;
  setIsVisibleRoute: Dispatch<SetStateAction<boolean>>;
};

export const LoginContext = createContext<LoginContextType>({
  isVisibleRoute: false,
  setIsVisibleRoute: function (): void {
    throw new Error("Function not implemented.");
  },
});
