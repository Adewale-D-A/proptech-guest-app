/** @format */

"use client";

import { Toaster } from "@/components/_shared/toast/toaster";
import ScrollToTopButton from "@/components/scroll-to-top";
import store, { persistor } from "@/redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <ScrollToTopButton />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}
