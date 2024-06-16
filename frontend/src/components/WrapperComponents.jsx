/* eslint-disable react/prop-types */
export const MainWrapper = ({ children }) => (
  <div className="min-h-screen font-jost flex flex-col items-center bg-gradient-to-br from-teal-700 to-teal-400 dark:from-gray-800 dark:to-gray-600">
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

export const AlertWrapper = ({ children }) => (
  <div className="fixed top-4 right-4">{children}</div>
);
