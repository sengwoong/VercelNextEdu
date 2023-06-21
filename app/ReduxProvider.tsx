// 리덕스를 모든 페이지에 적용하기 위해서 있습니다.
"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
