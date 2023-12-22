import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";

const Board = () => {
  const [columns, setColumn] = useState<Column[]>([]);

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

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns?.map((column, idx) => (
            <ColumnContainer
              deleteColumn={deleteColumn}
              column={column}
              key={idx}
            />
          ))}
        </div>
        <button
          onClick={createNewColumn}
          className="h-[60px] w-[250px] min-w-[250px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 p-4 ring-rose-500 hover:ring-2 flex gap-2"
        >
          <PlusIcon />
          Add Column
        </button>
      </div>
    </div>
  );
};

export default Board;
