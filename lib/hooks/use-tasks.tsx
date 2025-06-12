import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { createContext, useContext, useState, ReactNode } from "react";
import { defaultTasks } from "../default-tasks";
import { Task, TaskStatus } from "../tasks.types";

let nextId = defaultTasks.length + 1;

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  setTaskStatus: (id: number, status: TaskStatus) => void;
  deleteTask: (id: number) => void;
  deleteTasks: (tasks: number[] | string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  useCopilotReadable({
    description: "The state of the todo list containing all tasks",
    value: JSON.stringify(tasks),
  });

  useCopilotAction({
    name: "addTask",
    description: "Adds a task to the todo list",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the task",
        required: true,
      },
    ],
    handler: ({ title }) => {
      addTask(title);
    },
  });

  useCopilotAction({
    name: "deleteTask",
    description: "Deletes a task from the todo list",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The id of the task",
        required: true,
      },
    ],
    handler: ({ id }) => {
      deleteTask(id);
    },
    /* generative UI - rendered in chat
    render: ({ status, args }) =>
      status === "complete" ? (
        <h2 style={{ color: "red" }}>Deleted {args.id}</h2>
      ) : (
        <h2 style={{ color: "blue" }}>Thinking...</h2>
      ),*/
  });

  useCopilotAction({
    name: "deleteTasks",
    description: "Delete multiple tasks by their IDs",
    parameters: [
      {
        name: "taskIds",
        type: "string", // or "array"
        description: "Comma-separated task IDs to delete",
        required: true,
      },
    ],
    handler: ({ taskIds }) => {
      deleteTasks(taskIds);
    },
  });

  useCopilotAction({
    name: "setTaskStatus",
    description: "Sets the status of a task",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The id of the task",
        required: true,
      },
      {
        name: "status",
        type: "string",
        description: "The status of the task",
        enum: Object.values(TaskStatus),
        required: true,
      },
    ],
    handler: ({ id, status }) => {
      setTaskStatus(id, status);
    },
  });

  const addTask = (title: string) => {
    setTasks([...tasks, { id: nextId++, title, status: TaskStatus.todo }]);
  };

  const setTaskStatus = (id: number, status: TaskStatus) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteTasks = (ids: number[] | string) => {
    if (typeof ids === "string") {
      const taskIds = ids.split(",").map(Number);
      setTasks(tasks.filter(({ id }) => !taskIds.includes(id)));
    } else {
      setTasks(tasks.filter(({ id }) => !ids.includes(id)));
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, setTaskStatus, deleteTask, deleteTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
