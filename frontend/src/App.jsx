import React, { useState, useEffect, useRef } from "react";

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
  Alert,
  AlertWrapper,
} from "./components";

const App = () => {
  const API = import.meta.env.VITE_API_URL;
  const [tasks, setTasks] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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
  }, []);

  const addTask = (taskTitle) => {
    setAlertVisible(false);
    const newTask = { title: taskTitle };
    fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          setAlertMessage(response.message);
          setAlertSeverity("success");
          setAlertVisible(true);
          setTasks((prevTasks) => [...prevTasks, response.data]);
        } else {
          throw new Error("Invalid Server Response!");
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        setAlertMessage("Error Adding Task!");
        setAlertSeverity("error");
        setAlertVisible(true);
      });
  };

  const removeTask = (taskId) => {
    setAlertVisible(false);
    fetch(`${API}/api/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          setAlertMessage(response.message);
          setAlertSeverity("success");
          setAlertVisible(true);
          const updatedTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(updatedTasks);
        } else {
          throw new Error("Invalid server response");
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        setAlertMessage("Error Deleting Task!");
        setAlertSeverity("error");
        setAlertVisible(true);
      });
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
        fetchTasks();
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
      <AlertWrapper>
        <Alert
          visible={alertVisible}
          message={alertMessage}
          severity={alertSeverity}
        />
      </AlertWrapper>
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
