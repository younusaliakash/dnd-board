import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";

interface TaskProps {
  task: Task;
  deleteTask : (id : Id) => void;
}

const TaskCard = ({ task, deleteTask }: TaskProps) => {
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] flex items-center text-left rounded-xl hover:ring-inset hover:ring-2 hover:ring-rose-500 cursor-grabs relative"
    >
      {task.content}
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
