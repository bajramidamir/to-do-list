import React, { useState } from "react";

const InputField = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Enter a title for a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="p-3 rounded-lg bg-transparent border font-light w-72 lg:w-96 border-white lg:text-xl text-slate-100 placeholder-gray-300 focus:outline-none"
      />
      <button
        onClick={handleAddTask}
        className={`absolute top-1/2 right-4 -translate-y-1/2 transition-opacity duration-300 ${task ? 'opacity-100' : 'opacity-0'}`}
      >
        <img src="images/plus.svg" alt="plus button" className="lg:w-8 w-6 invert" />
      </button>
    </div>
  );
};

export default InputField;
