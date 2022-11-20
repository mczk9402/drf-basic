import axios from "axios";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";

type Task = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

type NewTask = Pick<Task, "id" | "title">;

export const DrfApiFetch = () => {
  const [tasks, setTasks] = useState<Task[] | []>([]);

  const getTasks = () => {
    axios
      .get<Task[]>("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Token 092997caa6207928b4b837068634e577337eeca8",
        },
      })
      .then((res) => setTasks(res.data));
  };

  const deleteTask = (id: number) => {
    axios
      .delete<Task>(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 092997caa6207928b4b837068634e577337eeca8",
        },
      })
      .then((res) => {
        console.log(res);
        setTasks((prev) => prev.filter((item) => id !== item.id));
      });
  };

  const newTask = (newTask: NewTask) => {
    axios
      .post<Task>("http://127.0.0.1:8000/api/tasks/", newTask, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 092997caa6207928b4b837068634e577337eeca8",
        },
      })
      .then((res) => {
        console.log(res);
        setTasks((prev) => [...prev, res.data]);
      });
  };

  const updateTask = (task: Task) => {
    axios.put<Task>(`http://127.0.0.1:8000/api/tasks/${task.id}/`, task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 092997caa6207928b4b837068634e577337eeca8",
      },
    });
  };

  useEffect(getTasks, []);

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <Task
            task={task}
            handleUpdate={updateTask}
            handleDelete={deleteTask}
            key={task.id}
          />
        ))}
      </ul>
      <AddTask handleAddTask={newTask} />
    </div>
  );
};

const AddTask: FC<{ handleAddTask: (newTask: NewTask) => void }> = ({
  handleAddTask,
}) => {
  const [title, setTitle] = useState("");

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />
      <button
        onClick={() =>
          handleAddTask({
            id: 0,
            title,
          })
        }
      >
        新規
      </button>
    </div>
  );
};

const Task: FC<{
  task: Task;
  handleUpdate: (task: Task) => void;
  handleDelete: (id: number) => void;
}> = ({ task, handleUpdate, handleDelete }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editedTask, setEditedTask] = useState(task);
  const [disabled, setDisabled] = useState(true);
  const liStyle = {
    display: "grid",
    gridTemplateColumns: "3fr 1fr 1fr",
  };
  const inputStyle = {
    border: "none",
    backgroundColor: "transparent",
    color: "#111111",
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabled]);

  return (
    <li style={liStyle}>
      <input
        ref={(ref) => (inputRef.current = ref)}
        style={inputStyle}
        value={editedTask.title}
        name={String(task.id)}
        onChange={(e) =>
          setEditedTask((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        disabled={disabled}
        type="text"
      />
      {disabled ? (
        <button
          onClick={() => {
            setDisabled(false);
          }}
          type="button"
        >
          編集
        </button>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <button
            onClick={() => {
              handleUpdate(editedTask);
              setDisabled(true);
            }}
            type="button"
          >
            更新
          </button>
          <button onClick={() => setDisabled(true)} type="button">
            中止
          </button>
        </div>
      )}
      <button onClick={() => handleDelete(task.id)}>削除</button>
    </li>
  );
};
