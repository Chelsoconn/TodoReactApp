import { Content } from "./components/Content";
import { Modal } from "./components/Modal";
import { Nav } from "./components/Nav";
import { useState, useEffect } from "react";
import { getAllTodos } from "./services/requests";

import { AllToDosWithId, TodoWithId } from './types/types'


import "../public/css/todo_v2.css";
import "../public/css/reset.css";

const App = () => {

  //set state
  const [allTodos, setAllTodos] = useState<AllToDosWithId>([]);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<null | TodoWithId>(null);
  //

  //get all todos to set state initially
  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      try {
        const todos = await getAllTodos();
        setAllTodos(todos);
      } catch (error) {
        console.log(`Error fetching all todos: ${error} `);
      }
    };
    fetchTodos();
  }, []);
  //

return (
  <>
    <Nav />
    <Content
      allTodos={allTodos}
      setModalStatus={setModalStatus}
      setAllTodos={setAllTodos}
      setSelectedTodo={setSelectedTodo}
    />
    <Modal
      modalStatus={modalStatus}
      setModalStatus={setModalStatus}
      allTodos={allTodos}
      setAllTodos={setAllTodos}
      selectedTodo={selectedTodo}
      setSelectedTodo={setSelectedTodo}
    />
  </>
);
};

export default App;



