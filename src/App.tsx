import { Content } from "./components/Content";
import { Modal } from "./components/Modal";
import { Nav } from "./components/Nav";
import { useState, useEffect } from "react";
import { getAllTodos } from "./services/requests";

import { AllToDosWithId, TodoWithId } from "./types/types";

import "../public/css/todo_v2.css";
import "../public/css/reset.css";

const App = () => {
  const [allTodos, setAllTodos] = useState<AllToDosWithId>([]);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<null | TodoWithId>(null);
  const [currentClicked, setCurrentClicked] = useState<
    [AllToDosWithId, string, number | string, boolean] | []
  >([]);

  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      try {
        const todos = await getAllTodos();
        setAllTodos(todos);
        setCurrentClicked([todos, "All Todos", todos.length, false]);
      } catch (error) {
        console.log(`Error fetching all todos: ${error} `);
      }
    };
    fetchTodos();
  }, []);

  return (
    <>
      <Nav
        allTodos={allTodos}
        setCurrentClicked={setCurrentClicked}
        currentClicked={currentClicked}
      />
      <Content
        allTodos={allTodos}
        setModalStatus={setModalStatus}
        setAllTodos={setAllTodos}
        setSelectedTodo={setSelectedTodo}
        currentClicked={currentClicked}
      />
      <Modal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        allTodos={allTodos}
        setAllTodos={setAllTodos}
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
        setCurrentClicked={setCurrentClicked}
      />
    </>
  );
};

export default App;
