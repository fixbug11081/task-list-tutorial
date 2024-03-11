import React, { usestate, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import AddTaskForm from "./components/AddTaskForm";
import Tasks from "./components/Tasks";
import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const [tasks, setTasks] = useState([]);

const fetchTasks = async () => {
  try {
    const { data } = await axios.get(API_URL);
    setTasks(data);
  } catch (err) {
    console.log("Error in ${err}");
  }
};

useEffect(() => {
  fetchTasks();
}, []);

export default function App() {
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
