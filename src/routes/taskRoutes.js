import { TaskController } from "../controller/taskController.js";
import { buildRoutePath } from "../utils/buildRoutePath.js";

const controller = new TaskController()
export const taskRoutes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => controller.handleList(req, res)
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => controller.handleCreate(req, res)
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => controller.handleUpdate(req, res)
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => controller.handleCompleteTask(req, res)
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => controller.handleDelete(req, res)
  }
]