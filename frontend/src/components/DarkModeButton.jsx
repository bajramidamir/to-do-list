import { useState, useEffect } from "react";

const DarkModeButton = () => {
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedDarkMode);

  useEffect(() => {
    document.body.classList.toggle("dark", storedDarkMode);
  }, [storedDarkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  return (
    <button
      className="fixed bottom-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-full shadow-md"
      onClick={toggleDarkMode}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeButton;
