import React, { useState, useEffect } from "react";

import {
  Header,
  Footer,
  InputField,
  TaskList,
  MainWrapper,
  CenterWrapper,
  ContentWrapper,
  Divider,
} from "./components";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // useEffect to load all the tasks
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [tasks]);

  const addTask = (taskTitle) => {
    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskTitle }),
    })
      .then((response) => response.json())
      .then((newTask) => setTasks([...tasks, newTask]))
      .catch((error) => console.error("Error adding task:", error));
  };

  const removeTask = (taskId) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const toggleTaskCompletion = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, completed: !task.completed };

    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then(() => {
        const updatedTasks = tasks.map((t) =>
          t.id === taskId ? updatedTask : t
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const toggleTaskPriority = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, priority: !task.priority };

    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then(() => {
        const updatedTasks = tasks.map((t) =>
          t.id === taskId ? updatedTask : t
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const updateTaskTitle = (taskId, newTitle) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, title: newTitle };
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then(() => {
        const updatedTasks = tasks.map((t) =>
          t.id === taskId ? updatedTask : t
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <MainWrapper>
      <Header />
      <CenterWrapper>
        <InputField addTask={addTask} />
        <Divider />
        <ContentWrapper>
          <TaskList
            tasks={tasks}
            removeTask={removeTask}
            toggleTaskCompletion={toggleTaskCompletion}
            toggleTaskPriority={toggleTaskPriority}
            updateTaskTitle={updateTaskTitle}
          />
        </ContentWrapper>
      </CenterWrapper>
      <Footer />
    </MainWrapper>
  );
};

export default App;
