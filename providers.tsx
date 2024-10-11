import React from "react";
import ContextProvider from "./config/Provider";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ContextProvider cookies={null}>{children}</ContextProvider>;
};

export default Providers;
