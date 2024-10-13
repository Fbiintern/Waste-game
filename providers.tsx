import React from "react";
import ContextProvider from "./config/Provider";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ContextProvider>{children}</ContextProvider>;
};

export default Providers;
