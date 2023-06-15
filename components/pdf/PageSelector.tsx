import { createContext } from "react";

type ContextType = {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>; // setValue의 형식을 변경
};
export const PageSelector = createContext<ContextType>({
  value: false,
  setValue: () => {},
});



// import { createContext } from "react";

// type ContextType = {
//   counter: number;
//   setCounter: React.Dispatch<React.SetStateAction<number>>;
// };

// export const useUnderScrollerInChat = createContext<ContextType>({
//   counter: 0,
//   setCounter: () => {},
// });
