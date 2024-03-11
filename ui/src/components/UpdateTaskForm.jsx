import { Dialog, TextField, Button, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URL } from "../utils";

const UpdateTaskForm = ({
  IsDialogOpen,
  setIsDialogOpen,
  task,
  fetchTasks,
}) => {
  const { id, completed } = task;
  const { taskName, setTaskName } = useState("");

  const handleTaskName = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name: taskName,
        completed,
      });
      await fetchTasks();
      setTaskName("");
    } catch (e) {
      console.log("Error ");
    }
  };
  return (
    <Dialog open={IsDialogOpen}>
      <DialogTitle>Edit Task</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label="Task"
          variant="outlined"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await handleTaskName();
            setIsDialogOpen(false);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};
export default UpdateTaskForm;
