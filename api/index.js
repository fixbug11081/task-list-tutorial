import express from "express";
import serverless from "serverless-http";
import { fetchTasks, updateTasks, createTasks, deleteTasks } from "./client";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json());
if (process.env.DEVELOPMENT) {
  app.use(cors());
}
app.get("/task", async (req, res) => {
  try {
    const task = await fetchTasks(task);

    res.send(task.item);
  } catch (err) {
    res.status(400).send("Fetching error ${err}");
  }
});

app.post("/task", async (req, res) => {
  try {
    const task = req.body;

    const response = await createTasks(task);
    res.send(response);
  } catch (err) {
    res.status(400).send("Creating error ${err}");
  }
});

app.put("/task", async (req, res) => {
  try {
    const task = req.body;

    const response = await updateTasks(task);
    res.send(response);
  } catch (err) {
    res.status(400).send("Updating error ${err}");
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deleteTasks(id);
    res.send(response);
  } catch (err) {
    res.status(400).send("Deleting error ${err}");
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => console.log("Server has been started at 5000"));
}

export const handler = serverless(app);
