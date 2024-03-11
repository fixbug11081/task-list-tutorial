import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import AddTaskForm from "./components/AddTaskForm";
import Tasks from "./components/Tasks";
import axios from "axios";
import { API_URL } from "./utils";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTasks(data);
    } catch (err) {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => {
        return <Tasks task={task} fetchTasks={fetchTasks} key={task.id} />;
      })}
    </ThemeProvider>
  );
}
