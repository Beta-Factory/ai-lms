"use client";

import React, { ReactNode } from "react";
import { useRef } from "react";
import { Provider } from "react-redux";
import { createStore, AppStore } from "../lib/store/store";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};
export default StoreProvider;
