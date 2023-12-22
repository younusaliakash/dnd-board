import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const Board = () => {
  const [columns, setColumn] = useState<Column[]>([]);
  const [activeColumns, setaActiveColumns] = useState<Column | null>(null);
  const columnId = useMemo(() => columns.map((column) => column.id), [columns]);

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
  }

  function onDragStartEvent(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setaActiveColumns(event.active.data.current.column);
      return;
    }
  }

  function onDragEndEvent(event: DragEndEvent) {
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

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensor}
        onDragStart={onDragStartEvent}
        onDragEnd={onDragEndEvent}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnId}>
              {columns?.map((column, idx) => (
                <ColumnContainer
                  deleteColumn={deleteColumn}
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
