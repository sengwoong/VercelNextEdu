import { configureStore } from '@reduxjs/toolkit';
import pdfReducer from '@/slices/pdfSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      pdf: pdfReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
