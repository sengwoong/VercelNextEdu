import { createContext } from "react";

type ContextType = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const useUnderScrollerInChat = createContext<ContextType>({
  counter: 0,
  setCounter: () => {},
});
