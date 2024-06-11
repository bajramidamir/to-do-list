import React, { useState, useEffect } from "react";

import {
  Header,
  Footer,
  InputField,
  TaskList,
  DarkModeButton,
  MainWrapper,
  CenterWrapper,
  ContentWrapper,
  Divider,
} from "./components";

const App = () => {
  //const API = import.meta.env.VITE_API_URL; // dotenv api endpoint
  const API = "http://localhost:3000";
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API}/api/tasks`);
      const data = await response.json();
      if (data && data.data) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // useEffect to load all the tasks
  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 2000);
    return () => clearInterval(interval);
  }, []);

  const addTask = (taskTitle) => {
    fetch(`${API}/api/tasks`, {
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
    fetch(`${API}/api/tasks/${taskId}`, {
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

    fetch(`${API}/api/tasks/${taskId}`, {
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

    fetch(`${API}/api/tasks/${taskId}`, {
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
    fetch(`${API}/api/tasks/${taskId}`, {
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

  const toggleTaskRecurring = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, recurring: !task.recurring };

    fetch(`${API}/api/tasks/${taskId}`, {
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

  const markTaskDoneForToday = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, completed: true };

    fetch(`${API}/api/tasks/${taskId}`, {
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
      <CenterWrapper>
        <ContentWrapper>
          <Header />
          <InputField addTask={addTask} />
          <Divider />
          <TaskList
            tasks={tasks}
            removeTask={removeTask}
            toggleTaskCompletion={toggleTaskCompletion}
            toggleTaskPriority={toggleTaskPriority}
            updateTaskTitle={updateTaskTitle}
            toggleTaskRecurring={toggleTaskRecurring}
            markTaskDoneForToday={markTaskDoneForToday}
          />
          <Footer />
        </ContentWrapper>
      </CenterWrapper>
      <DarkModeButton />
    </MainWrapper>
  );
};

export default App;
