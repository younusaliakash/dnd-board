# Interactive Drag and Drop Board

This project features a highly interactive drag-and-drop board, resembling a Kanban board. Users can create one to multiple columns, change the position of columns through dragging and dropping, update column titles, and delete columns if needed. The application is designed as a single UI without a connected database, so any changes made will be temporary and will disappear upon reloading.

## Features

- **Create and Manage Columns:**
  - Users can create one to multiple columns.
  - Change the position of columns by dragging and dropping.

- **Edit Column Titles:**
  - Click on a column title to enter editable mode.
  - Press Enter to temporarily set the written title in the UI.

- **Task Cards:**
  - Click on the "Add Task" button in each column to create one or more task cards.
  - Each task card has default text that can be edited by clicking on it.
  - Press Enter to save the edited text.

- **Manage Task Cards:**
  - Remove a card by clicking on the delete icon on the right side of each card.
  - Change the position of cards within a column by dragging and dropping.
  - **Drag and drop any task card inside a column.**
  - **Drag and drop a task card into another column.**

## Technologies Used

- React JS: Frontend library for building user interfaces.
- dnd-kit: Library for building accessible, draggable interfaces.
- Tailwind CSS: Utility-first CSS framework for designing.

## Usage

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the application with `npm start`.
4. Open the application in a web browser.

## Note

Since this is a single UI application with no database attached, any changes made, including column titles and card positions, will be temporary and will disappear when the application is reloaded.

## Contributing

Contributions are welcome! If you'd like to contribute to the development of this project, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Note:** Customize this README further based on additional information about the project, setup instructions, or any specific details you want to include.
