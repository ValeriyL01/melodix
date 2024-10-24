import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";

export const RouterOutlet: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
