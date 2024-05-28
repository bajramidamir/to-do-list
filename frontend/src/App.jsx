import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // useEffect to load all the tasks
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data.tasks))
      .catch(error => console.error('Error fetching tasks:', error));
  }, [tasks]);

  const addTask = (taskTitle) => {
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: taskTitle })
    })
    .then(response => response.json())
    .then(newTask => setTasks([...tasks, newTask]))
    .catch(error => console.error('Error adding task:', error));
  };

  const removeTask = (taskId) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE'
    })
    .then(() => {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    })
    .catch(error => console.error('Error deleting task:', error));
  };

  const toggleTaskCompletion = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    const updatedTask = { ...task, completed: !task.completed };

    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    .then(() => {
      const updatedTasks = tasks.map(t => (t.id === taskId ? updatedTask : t));
      setTasks(updatedTasks);
    })
    .catch(error => console.error('Error updating task:', error));
  };

  const toggleTaskPriority = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    const updatedTask = { ...task, priority: !task.priority };

    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    .then(() => {
      const updatedTasks = tasks.map(t => (t.id === taskId ? updatedTask : t));
      setTasks(updatedTasks);
    })
    .catch(error => console.error('Error updating task:', error));
  };


  return (
    <div className="min-h-screen font-jost flex flex-col items-center bg-gradient-to-br from-teal-800 to-teal-500">
      <Header />
      <div className="flex flex-col items-center justify-center w-full px-4">
        <InputField addTask={addTask} />
        <div className="w-full my-4 border-b border-gray-300" />
        <div className="flex justify-between w-full mb-4">
        </div>
        <div className="flex flex-col items-center w-full">
          <TaskList tasks={tasks} removeTask={removeTask} toggleTaskCompletion={toggleTaskCompletion} toggleTaskPriority={toggleTaskPriority} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
