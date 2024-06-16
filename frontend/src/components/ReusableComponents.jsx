/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export const SectionTitle = ({ title, className }) => (
  <div className={`text-3xl font-semibold mb-2 ${className}`}>{title}</div>
);

export const SectionDivider = ({ className }) => (
  <div className={`border-b mb-4 ${className}`}></div>
);

export const Alert = ({ message, severity, visible }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(visible);
    if (visible) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  let bgColor;
  switch (severity) {
    case 'error':
    case 'warning':
      bgColor = 'bg-red-500';
      break;
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'info':
      bgColor = 'bg-blue-500';
      break;
    default:
      bgColor = 'bg-gray-500';
  }

  return (
    <div className={`p-4 rounded-md ${bgColor} text-white transition-all ease-out duration-500 ${showAlert ? 'opacity-100' : 'opacity-0'}`}>
      {message}
    </div>
  );
};
