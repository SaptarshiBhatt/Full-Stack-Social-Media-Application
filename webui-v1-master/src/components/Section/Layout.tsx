import { ReactNode } from "react";
import Header from "./Header";
import React from "react";

type LayoutPropType = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutPropType) => {
  return (
    <>
      <Header />
      <main className="">{children}</main>
    </>
  );
};

export default Layout;
