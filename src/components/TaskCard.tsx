import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";

interface TaskProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const TaskCard = ({ task, deleteTask, updateTask }: TaskProps) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function toggleEditMode() {
    setEditMode((prev) => !prev);
    setMouseOver(false);
  }

  if (editMode) {
    return (
      <div className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] flex items-center text-left rounded-xl hover:ring-inset hover:ring-2 hover:ring-rose-500 cursor-grab relative">
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
      onClick={toggleEditMode}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] flex items-center text-left rounded-xl hover:ring-inset hover:ring-2 hover:ring-rose-500 cursor-grab relative task"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseOver && (
        <button
          onClick={() => deleteTask(task.id)}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
