import React, { useState } from "react";

import { Checkbox, Typography, Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTaskForm from "./UpdateTaskForm";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

const Tasks = ({ task, fetchTasks }) => {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [IsDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdate = async () => {
    try {
      await axios.put(API_URL, { id, name, completed: !isComplete });
      setIsComplete((prev) => !prev);
    } catch (e) {
      console.log("Error ");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);
      await fetchTasks();
    } catch (e) {
      console.log("Error");
    }
  };
  return (
    <div className="block">
      <div
        className={classnames(
          "flex",
          {
            done: isComplete,
          },
          task
        )}
      >
        <Checkbox checked={isComplete} onChange={handleUpdate} />
        <Typography variant="h6" className="task" padding="10px">
          {name}
        </Typography>

        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </div>

      <UpdateTaskForm
        IsDialogOpen={IsDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
        fetchTasks={fetchTasks}
      />
    </div>
  );
};

export default Tasks;
