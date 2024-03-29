import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { API_URL } from "../utils";

const AddTaskForm = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState("");

  const addNewTask = async () => {
    try {
      await axios.post(API_URL, {
        name: newTask,
        completed: false,
      });
      await fetchTasks();
      setNewTask("");
    } catch (e) {
      console.log(" Error " + e);
    }
  };
  return (
    <div className="title">
      <Typography variant="h4">My Task List</Typography>
      <TextField
        size="small"
        label="Task"
        variant="outlined"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button disabled={!newTask.length} onClick={addNewTask}>
        <AddIcon />
      </Button>
    </div>
  );
};

export default AddTaskForm;
