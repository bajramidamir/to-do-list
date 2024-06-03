import React from "react";

export const MainWrapper = ({ children }) => (
  <div className="min-h-screen font-jost flex flex-col items-center bg-gradient-to-br from-teal-800 to-teal-500">
    {children}
  </div>
);

export const CenterWrapper = ({ children }) => (
  <div className="flex flex-col items-center justify-center w-full max-w-lg px-4">
    {children}
  </div>
);

export const ContentWrapper = ({ children }) => (
  <div className="flex flex-col items-center w-full">{children}</div>
);

export const Divider = () => (
  <div className="w-full my-4 border-b border-gray-300" />
);

export const TaskWrapper = ({ children }) => (
  <div className="mt-4 max-w-lg w-full">{children}</div>
);
