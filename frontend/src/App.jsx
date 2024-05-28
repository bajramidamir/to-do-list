import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";

const App = () => {
  const initialTask = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(initialTask ? initialTask : []);

  // Function to add a new task
  const addTask = (taskTitle) => {
    const newTask = {
      id: Date.now(), // Generate unique ID for each task
      title: taskTitle,
    };
    setTasks([...tasks, newTask]);
  };

  // Function to remove a task by ID
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to store tasks in localStorage
  useEffect(() => {
    console.log("Saving tasks to localStorage:", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen font-jost flex flex-col items-center bg-gradient-to-r from-teal-700 to-teal-500">
      <Header />
      <div className="flex flex-col items-center justify-center w-full px-4">
        <InputField addTask={addTask} />
        <div className="w-full my-4 border-b border-gray-300" />
        <div className="flex flex-col items-center w-full">
          <TaskList tasks={tasks} removeTask={removeTask} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
