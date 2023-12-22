import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./Taskcard";

const Board = () => {
  const [columns, setColumn] = useState<Column[]>([]);
  const [activeColumns, setaActiveColumns] = useState<Column | null>(null);
  const columnId = useMemo(() => columns.map((column) => column.id), [columns]);

  const [tasks, setTask] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //3px
      },
    })
  );

  //function that will create a new column by clicking on the add column button
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumn([...columns, columnToAdd]);
  }

  //generate a random ID
  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  // Delete a column
  function deleteColumn(id: Id) {
    const filterColumn = columns.filter((column) => column.id !== id);
    setColumn(filterColumn);

    //remove relevant task when deleting current column
    const newTask = tasks.filter((task) => task.columnId !== id);
    setTask(newTask);
  }

  //update column
  function updateColumn(id: Id, title: string) {
    const newColumn = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumn(newColumn);
  }

  function onDragStartEvent(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setaActiveColumns(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEndEvent(event: DragEndEvent) {
    setaActiveColumns(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    //find active and over column index and swap them
    setColumn((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOverEvent(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    //I'm dropping a task over another task
    if (isActiveTask && isOverTask) {
      setTask((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeId);
        const overTaskIndex = tasks.findIndex((task) => task.id === overId);

        // if(tasks[activeTaskIndex].columnId !== tasks[overTaskIndex].columnId){
        //   tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId
        // }

        tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }

    //I'm dropping a task over another column
    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn) {
      setTask((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeTaskIndex].columnId = overId;

        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      });
    }
  }

  //create Task
  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTask([...tasks, newTask]);
  }

  //delete a task
  function deleteTask(id: Id) {
    const newTaks = tasks.filter((task) => task.id !== id);

    setTask(newTaks);
  }

  //update tasks
  function updateTask(id: Id, content: string) {
    const newTask = tasks.map((task) => {
      if (task.id !== id) return task;

      return { ...task, content };
    });

    setTask(newTask);
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensor}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragEndEvent}
        onDragOver={onDragOverEvent}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnId}>
              {columns?.map((column, idx) => (
                <ColumnContainer
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  column={column}
                  key={idx}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={createNewColumn}
            className="h-[60px] w-[250px] min-w-[250px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 p-4 ring-rose-500 hover:ring-2 flex gap-2"
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumns && (
              <ColumnContainer
                column={activeColumns}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumns.id
                )}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default Board;
